import { chromium } from 'playwright';
const BASE = 'http://localhost:4321/nccu-osa-redesign';
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
const log = (...a) => console.log(...a);
const S = 'review/screenshots/audit/';
for (const scheme of ['light','dark']) {
  const c = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme, deviceScaleFactor: 2 });
  const p = await c.newPage();
  await p.goto(BASE + '/'); await p.keyboard.press('Tab'); await p.keyboard.press('Tab');
  await p.screenshot({ path: S + `focus-alertband-${scheme}.png`, clip: { x: 0, y: 0, width: 700, height: 120 } });
  await p.keyboard.press('Tab'); await p.keyboard.press('Tab'); await p.keyboard.press('Tab'); await p.keyboard.press('Tab');
  await p.keyboard.press('Tab');
  await p.screenshot({ path: S + `focus-nav-${scheme}.png`, clip: { x: 700, y: 50, width: 740, height: 80 } });
  // skip link result
  await p.goto(BASE + '/'); await p.keyboard.press('Tab'); await p.screenshot({ path: S + `focus-skiplink-${scheme}.png`, clip: { x: 0, y: 0, width: 700, height: 140 } });
  await p.keyboard.press('Enter'); await p.waitForTimeout(200);
  await p.screenshot({ path: S + `focus-after-skip-${scheme}.png` });
  // phrase focus
  for (let i=0;i<1;i++) await p.keyboard.press('Tab');
  await p.screenshot({ path: S + `focus-phrase-${scheme}.png`, clip: { x: 0, y: 150, width: 1000, height: 300 } });
  await c.close();
}
// focus obscured in services desktop
{
  const c = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await c.newPage();
  await p.goto(BASE + '/services/');
  await p.evaluate(() => window.scrollTo(0, 2500));
  await p.waitForTimeout(200);
  let obscured = 0, total = 0, ex = null;
  // focus last task link then shift+tab backwards
  await p.focus('[data-task]:last-child a');
  for (let i = 0; i < 30; i++) {
    await p.keyboard.press('Shift+Tab');
    const r = await p.evaluate(() => { const a = document.activeElement; const r = a.getBoundingClientRect(); const f = document.querySelector('.finder').getBoundingClientRect(); return { t: a.textContent.trim().slice(0, 10), top: r.top, bottom: r.bottom, fb: f.bottom, inFinder: !!a.closest('.finder') }; });
    if (r.inFinder) continue;
    total++; if (r.top < r.fb) { obscured++; if (!ex) ex = r; }
  }
  log('services shift-tab obscured', obscured, '/', total, JSON.stringify(ex));
  if (ex) await p.screenshot({ path: S + 'focus-obscured-services.png' });
  // query tests
  for (const q of ['獎學金', '住宿', '退宿', '打工', '休學', '心理', '看醫生', '請假', '兵役', '身障', 'dorm', 'scholarship', '學貸', '租屋', '宿舍費']) {
    await p.fill('#q', q); log('q', q, await p.textContent('#count'));
  }
  await c.close();
}
// footer gap & mobile menu screenshot
{
  const c = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const p = await c.newPage();
  await p.goto(BASE + '/');
  log('footer gap', await p.evaluate(() => getComputedStyle(document.querySelector('.footer-grid')).rowGap + ' / ' + getComputedStyle(document.querySelector('.footer-grid')).columnGap));
  await p.locator('.site-footer').screenshot({ path: S + 'footer-mob-light.png' });
  await p.click('#menu-toggle'); await p.screenshot({ path: S + 'mobile-menu-open.png' });
  // alert band mobile
  await p.locator('.alert-band').screenshot({ path: S + 'alertband-mob.png' });
  await c.close();
}
{
  const c = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await c.newPage(); await p.goto(BASE + '/');
  log('desk footer gap', await p.evaluate(() => getComputedStyle(document.querySelector('.footer-grid')).columnGap));
  log('btn font', await p.evaluate(() => getComputedStyle(document.querySelector('.hero-search .btn')).fontSize));
  log('#q font', await p.evaluate(() => getComputedStyle(document.querySelector('.hero-search input')).fontSize));
  // count of 12.8px text nodes
  log('min font sizes', await p.evaluate(() => { const m = {}; document.querySelectorAll('body *').forEach(e => { if ([...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) { const f = getComputedStyle(e).fontSize; m[f] = (m[f] || 0) + 1; } }); return m; }));
  await c.close();
}
// unit list phone vs unit page phone
{
  const c = await b.newContext(); const p = await c.newPage();
  await p.goto(BASE + '/units/');
  log('units phones', await p.evaluate(() => [...document.querySelectorAll('.ut-side a')].map(a => a.textContent)));
  await p.goto(BASE + '/units/housing/');
  log('housing phone', await p.evaluate(() => document.querySelector('.contact-strip dd a')?.textContent));
  await p.goto(BASE + '/tasks/dorm/');
  log('dorm breadcrumb 3 href', await p.evaluate(() => [...document.querySelectorAll('.breadcrumb a')].map(a => a.textContent + '>' + a.getAttribute('href'))));
  log('tel hrefs', await p.evaluate(() => [...document.querySelectorAll('a[href^="tel:"]')].map(a => a.getAttribute('href') + ' ' + a.textContent).slice(0, 8)));
  await c.close();
}
await b.close();
