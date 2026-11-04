// Fetch the latest news from every OSA unit's 最新消息 page and refresh src/data/news.json.
//
// Usage: node scripts/update-news.mjs [--dry-run] [--html <unitSlug>=<file.html> ...]
//   --dry-run   print the result, do not write news.json
//   --html      parse a saved HTML file instead of fetching (for tests)
//
// Safety: a unit whose page fails or yields no rows keeps its previous items.
// If every unit fails, the script exits with code 1 and news.json is left untouched,
// so the deployed site keeps its last good data.
import { readFile, writeFile } from 'node:fs/promises';
import { load } from 'cheerio';

const ROOT = new URL('..', import.meta.url);
const NEWS = new URL('src/data/news.json', ROOT);
const META = new URL('src/data/news-meta.json', ROOT);
const UNITS = new URL('src/data/units.json', ROOT);
const KEEP = 40; // items kept on the site
const UA = 'nccu-osa-redesign-news-bot (+https://github.com/Frankfangcode/nccu-osa-redesign)';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const fixtures = Object.fromEntries(
  args.flatMap((a, i) => (args[i - 1] === '--html' ? [a.split('=')] : [])),
);

const units = JSON.parse(await readFile(UNITS, 'utf8')).filter((u) => u.newsUrl);
const previous = JSON.parse(await readFile(NEWS, 'utf8'));

/** Extract news rows from one 最新消息 list page. */
export function parseList(html, pageUrl, unit) {
  const $ = load(html);
  const listPath = decodeURIComponent(new URL(pageUrl).pathname);
  const items = [];
  $('tr').each((_, tr) => {
    const row = $(tr);
    const link = row
      .find('a[href]')
      .toArray()
      .map((a) => $(a))
      .find((a) => {
        const path = decodeURIComponent(new URL(a.attr('href'), pageUrl).pathname);
        return path.startsWith(listPath + '/') && /\/\d+-/.test(path);
      });
    if (!link) return;
    const date = row.text().match(/\b(20\d{2})[-/.](\d{1,2})[-/.](\d{1,2})\b/);
    if (!date) return;
    const title = (link.text() || link.attr('title') || '').replace(/\s+/g, ' ').trim();
    if (!title) return;
    const tags = row
      .find('a[href*="/component/tags/tag/"]')
      .toArray()
      .map((a) => $(a).text().trim())
      .filter(Boolean);
    items.push({
      title,
      date: `${date[1]}-${date[2].padStart(2, '0')}-${date[3].padStart(2, '0')}`,
      unit,
      url: new URL(link.attr('href'), pageUrl).href,
      category: tags.join('、'),
    });
  });
  return items;
}

async function fetchPage(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'zh-TW' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

const idOf = (url) => decodeURIComponent(new URL(url).pathname).match(/\/(\d+)-/)?.[1] ?? url;

const fresh = [];
let ok = 0;
for (const u of units) {
  try {
    const html = fixtures[u.slug]
      ? await readFile(fixtures[u.slug], 'utf8')
      : await fetchPage(u.newsUrl);
    const rows = parseList(html, u.newsUrl, u.slug);
    if (rows.length === 0) throw new Error('no rows parsed (page layout may have changed)');
    fresh.push(...rows);
    ok++;
    console.log(`✓ ${u.shortName}: ${rows.length}`);
  } catch (err) {
    // Keep this unit's previous items so a single failure never empties it.
    fresh.push(...previous.filter((n) => n.unit === u.slug));
    console.warn(`✗ ${u.shortName}: ${err.message} — kept previous items`);
  }
  if (!fixtures[u.slug]) await new Promise((r) => setTimeout(r, 800)); // be polite to the server
}

if (ok === 0) {
  console.error('Every unit failed; news.json left unchanged.');
  process.exit(1);
}

// Merge: newest data wins per article id; keep categories we already knew if the page had none.
const byId = new Map(previous.map((n) => [idOf(n.url), n]));
for (const n of fresh) {
  const old = byId.get(idOf(n.url));
  byId.set(idOf(n.url), { ...n, category: n.category || old?.category || '' });
}
const merged = [...byId.values()]
  .sort((a, b) => b.date.localeCompare(a.date) || Number(idOf(b.url)) - Number(idOf(a.url)))
  .slice(0, KEEP);

const before = JSON.stringify(previous);
const after = JSON.stringify(merged);
console.log(`${ok}/${units.length} units fetched; ${merged.length} items; ${before === after ? 'no change' : 'changed'}`);
if (!dryRun && before !== after) {
  await writeFile(NEWS, JSON.stringify(merged, null, 2) + '\n');
  const today = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Taipei' }).format(new Date());
  await writeFile(META, JSON.stringify({ updatedAt: today }) + '\n');
}
