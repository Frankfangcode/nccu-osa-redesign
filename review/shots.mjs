import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import fs from 'fs';
const BASE = 'http://localhost:4321/nccu-osa-redesign';
const pages = ['/', '/services/', '/tasks/dorm/', '/tasks/counseling/', '/units/health-center/', '/units/', '/news/', '/emergency/'];
const vps = { desk: { width: 1440, height: 900 }, mob: { width: 390, height: 844 } };
const out = 'review/screenshots/audit';
const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
const axeRes = {};
for (const scheme of ['light', 'dark']) for (const [vn, vp] of Object.entries(vps)) {
  const ctx = await browser.newContext({ viewport: vp, colorScheme: scheme, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  for (const p of pages) {
    await page.goto(BASE + p, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const name = (p === '/' ? 'home' : p.replace(/^\/|\/$/g, '').replace(/\//g, '_'));
    await page.screenshot({ path: `${out}/${name}-${vn}-${scheme}.png`, fullPage: true });
    if (vn === 'desk' || true) {
      const r = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']).analyze();
      axeRes[`${name}-${vn}-${scheme}`] = r.violations.map(v => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.map(n => ({ t: n.target.join(' '), s: n.failureSummary?.slice(0, 300) })) }));
    }
  }
  await ctx.close();
}
fs.writeFileSync('review/axe-results.json', JSON.stringify(axeRes, null, 1));
for (const [k, v] of Object.entries(axeRes)) console.log(k, v.map(x => `${x.id}(${x.nodes.length})`).join(' ') || 'OK');
await browser.close();
