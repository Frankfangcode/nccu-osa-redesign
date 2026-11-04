// Usage: node scripts/shoot.mjs <outDir> [baseUrl]
import { chromium } from 'playwright';
const out = process.argv[2] || 'review/screenshots';
const base = process.argv[3] || 'http://localhost:4321/nccu-osa-redesign';
const pages = [
  ['home', '/'], ['services', '/services/'], ['task', '/tasks/dorm/'],
  ['unit', '/units/health-center/'], ['news', '/news/'], ['emergency', '/emergency/'],
];
const views = [['desktop', { width: 1440, height: 900 }], ['mobile', { width: 390, height: 844 }]];
const exe = process.env.CHROME || '/usr/bin/google-chrome';
const browser = await chromium.launch({ executablePath: exe });
for (const scheme of ['light', 'dark']) {
  for (const [vname, vp] of views) {
    const ctx = await browser.newContext({ viewport: vp, colorScheme: scheme, deviceScaleFactor: vname === 'mobile' ? 2 : 1 });
    const page = await ctx.newPage();
    for (const [name, path] of pages) {
      await page.goto(base + path, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: `${out}/${name}-${vname}-${scheme}.png`, fullPage: true });
    }
    await ctx.close();
  }
}
await browser.close();
console.log('done');
