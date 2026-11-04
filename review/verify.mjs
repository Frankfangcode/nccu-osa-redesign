// Re-checks the review's P0 findings after fixes.
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
const base = 'http://localhost:4321/nccu-osa-redesign';
const pages = ['/', '/services/', '/tasks/dorm/', '/tasks/counseling/', '/units/health-center/', '/units/', '/news/', '/emergency/'];
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
let axeTotal = 0;
for (const scheme of ['light', 'dark']) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
  const p = await ctx.newPage();
  for (const path of pages) {
    await p.goto(base + path, { waitUntil: 'networkidle' });
    const r = await new AxeBuilder({ page: p }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    axeTotal += r.violations.length;
    for (const v of r.violations) console.log(`axe ${scheme} ${path}: ${v.id} (${v.nodes.length})`);
  }
  await ctx.close();
}
console.log('axe violations total:', axeTotal);
// reflow at 320
const c320 = await b.newContext({ viewport: { width: 320, height: 640 } });
const q = await c320.newPage();
for (const path of pages) {
  await q.goto(base + path, { waitUntil: 'networkidle' });
  const w = await q.evaluate(() => document.documentElement.scrollWidth);
  if (w > 320) console.log('REFLOW FAIL', path, w);
}
console.log('reflow checked');
// mobile menu focus order
const cm = await b.newContext({ viewport: { width: 390, height: 844 } });
const m = await cm.newPage();
await m.goto(base + '/', { waitUntil: 'networkidle' });
await m.focus('#menu-toggle'); await m.keyboard.press('Enter');
const f1 = await m.evaluate(() => document.activeElement.textContent.trim());
await m.keyboard.press('Tab');
const f2 = await m.evaluate(() => document.activeElement.textContent.trim());
console.log('menu focus after open:', f1, '| next Tab:', f2);
// alert band targets + focus outline color
const t = await m.evaluate(() => [...document.querySelectorAll('.alert-band a')].map(a => { const r = a.getBoundingClientRect(); return `${a.textContent.trim()} ${Math.round(r.width)}x${Math.round(r.height)}`; }));
console.log('alert targets:', t.join(', '));
await m.focus('.alert-band a');
const oc = await m.evaluate(() => getComputedStyle(document.activeElement).outlineColor + ' on ' + getComputedStyle(document.querySelector('.alert-band')).backgroundColor);
console.log('alert focus outline:', oc);
await b.close();
