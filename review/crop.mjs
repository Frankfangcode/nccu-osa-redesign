import { chromium } from 'playwright';
const [,, path, sel, out, scheme='light', w='1440', h='900'] = process.argv;
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
const ctx = await b.newContext({ viewport: { width: +w, height: +h }, colorScheme: scheme, deviceScaleFactor: 2 });
const p = await ctx.newPage();
await p.goto('http://localhost:4321/nccu-osa-redesign' + path, { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
await p.locator(sel).first().screenshot({ path: out });
await b.close();
