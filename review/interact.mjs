import { chromium } from 'playwright';
const BASE = 'http://localhost:4321/nccu-osa-redesign';
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
const log = (...a) => console.log(...a);
async function ctx(opts = {}) { const c = await b.newContext({ viewport: { width: 1440, height: 900 }, ...opts }); return [c, await c.newPage()]; }

// --- contrast helper in page
const contrastFn = `
window.__lum = (c) => { const m = c.match(/[\\d.]+/g).map(Number); const [r,g,bb] = m.slice(0,3).map(v => { v/=255; return v<=0.03928? v/12.92 : Math.pow((v+0.055)/1.055,2.4); }); return 0.2126*r+0.7152*g+0.0722*bb; };
window.__bg = (el) => { while (el) { const s = getComputedStyle(el).backgroundColor; const a = s.match(/[\\d.]+/g); if (a && (a.length<4 || +a[3] > 0.5)) return s; el = el.parentElement; } return 'rgb(255,255,255)'; };
window.__cr = (a,b) => { const x = __lum(a), y = __lum(b); return ((Math.max(x,y)+0.05)/(Math.min(x,y)+0.05)).toFixed(2); };
`;
async function contrasts(page, sels) {
  await page.addScriptTag({ content: contrastFn });
  return page.evaluate((sels) => sels.map(s => { const el = document.querySelector(s); if (!el) return [s, 'missing']; const fg = getComputedStyle(el).color; const bg = __bg(el); return [s, fg, bg, __cr(fg, bg), getComputedStyle(el).fontSize]; }), sels);
}

for (const scheme of ['light', 'dark']) {
  const [c, p] = await ctx({ colorScheme: scheme });
  await p.goto(BASE + '/');
  log('\n== contrast home', scheme);
  for (const r of await contrasts(p, ['.alert-label', '.alert-phone', '.alert-life', '.alert-more', '.nav-emergency a', '.brand-sub', '.news-date', '.tag', '.news-unit', '.ll-meta', '.help-duty dd a', '.hero-search input', '.phrase-more', '.btn', '.brand-mark', '.site-footer p', '.footer-note a'])) log(r.join(' | '));
  // placeholder
  log('placeholder', await p.evaluate(() => getComputedStyle(document.querySelector('#hero-q'), '::placeholder').color));
  // input border contrast (non-text 3:1)
  await p.addScriptTag({ content: contrastFn });
  log('input border vs bg', await p.evaluate(() => { const i = document.querySelector('#hero-q'); return [getComputedStyle(i).borderTopColor, __cr(getComputedStyle(i).borderTopColor, __bg(i.parentElement))]; }));
  log('tag border vs bg', await p.evaluate(() => { const i = document.querySelector('.tag'); return __cr(getComputedStyle(i).borderTopColor, __bg(i)); }));
  // focus outline contrast
  await p.keyboard.press('Tab'); await p.keyboard.press('Tab');
  log('focus el 2', await p.evaluate(() => { const a = document.activeElement; const s = getComputedStyle(a); return [a.className || a.tagName, a.textContent.trim().slice(0,20), s.outlineColor, s.outlineWidth, s.outlineStyle, __cr(s.outlineColor, __bg(a.parentElement))]; }));
  await p.goto(BASE + '/emergency/');
  log('-- emergency', scheme);
  for (const r of await contrasts(p, ['.tier-life h2', '.tier-life .tier-head p', '.life-num', '.life-name', '.badge', '.big-note', '.big-desc', '.source', '.ll-hours', '.ll-num', '.tier-24 .tier-head p'])) log(r.join(' | '));
  await p.goto(BASE + '/services/');
  for (const r of await contrasts(p, ['.task-unit', '.result-count', '.aud-filter span', '.task-summary'])) log(r.join(' | '));
  await p.goto(BASE + '/units/health-center/');
  for (const r of await contrasts(p, ['.unit-nav a', '.unit-nav-title', '.breadcrumb a', '.contact-strip dt', '.task-chips a'])) log(r.join(' | '));
  await p.goto(BASE + '/tasks/dorm/');
  for (const r of await contrasts(p, ['.urgent', '.urgent a', '.task-kicker', '.owner-title', '.note'])) log(r.join(' | '));
  await c.close();
}

// --- skip link + tab order
{
  const [c, p] = await ctx();
  await p.goto(BASE + '/');
  const seq = [];
  for (let i = 0; i < 14; i++) { await p.keyboard.press('Tab'); seq.push(await p.evaluate(() => { const a = document.activeElement; const r = a.getBoundingClientRect(); return `${a.tagName}.${a.className}:${(a.getAttribute('aria-label')||a.textContent).trim().slice(0,14)}@${Math.round(r.top)}`; })); }
  log('\nTAB order desktop:', seq.join(' -> '));
  await p.goto(BASE + '/'); await p.keyboard.press('Tab');
  log('skip visible', await p.evaluate(() => { const r = document.activeElement.getBoundingClientRect(); return [document.activeElement.textContent, r.top, r.height]; }));
  await p.keyboard.press('Enter');
  log('after skip active', await p.evaluate(() => document.activeElement.id), 'next tab ->');
  await p.keyboard.press('Tab'); log(await p.evaluate(() => document.activeElement.textContent.trim().slice(0, 20)));
  // theme toggle
  await p.click('#theme-toggle');
  log('theme after click', await p.evaluate(() => [document.documentElement.dataset.theme, localStorage.getItem('theme'), document.querySelector('#theme-toggle').getAttribute('aria-pressed'), document.querySelector('#theme-toggle').getAttribute('aria-label'), getComputedStyle(document.body).backgroundColor]));
  await p.reload();
  log('theme persist', await p.evaluate(() => [document.documentElement.dataset.theme, getComputedStyle(document.body).backgroundColor, document.querySelector('#theme-toggle').getAttribute('aria-pressed')]));
  // theme-color meta when toggled
  log('meta theme-color', await p.evaluate(() => [...document.querySelectorAll('meta[name=theme-color]')].map(m => m.content)));
  // hero search submit
  await p.evaluate(() => localStorage.clear());
  await p.goto(BASE + '/');
  await p.fill('#hero-q', '宿舍'); await p.press('#hero-q', 'Enter'); await p.waitForLoadState('networkidle');
  log('search submit url', p.url(), await p.textContent('#count'), 'q value', await p.inputValue('#q'));
  await p.waitForTimeout(1500);
  log('pagefind box hidden?', await p.evaluate(() => [document.getElementById('site-results').hidden, document.querySelectorAll('#site-results-list li').length, [...document.querySelectorAll('#site-results-list a')].map(a => a.textContent + ' ' + a.getAttribute('href')).slice(0, 8)]));
  // header search icon
  await p.goto(BASE + '/'); await p.click('a.icon-btn[href*="services"]'); await p.waitForLoadState('networkidle');
  log('search icon focus', p.url(), await p.evaluate(() => document.activeElement.id));
  await c.close();
}

// --- services live region behaviour
{
  const [c, p] = await ctx();
  await p.goto(BASE + '/services/');
  log('\ncount attrs', await p.evaluate(() => { const e = document.getElementById('count'); return [e.getAttribute('aria-live'), e.getAttribute('role'), e.getAttribute('aria-atomic'), e.parentElement.getAttribute('role')]; }));
  await p.evaluate(() => { window.__mut = []; new MutationObserver(() => window.__mut.push(document.getElementById('count').textContent)).observe(document.getElementById('count'), { childList: true, characterData: true, subtree: true }); });
  await p.type('#q', '宿舍', { delay: 80 });
  await p.waitForTimeout(400);
  log('mutations while typing', await p.evaluate(() => window.__mut));
  await p.check('input[name=aud][value="陸生"]', { force: true });
  log('after 陸生', await p.textContent('#count'));
  await p.fill('#q', 'zzzz');
  log('no-result', await p.evaluate(() => [document.getElementById('count').textContent, !document.getElementById('no-result').hidden, document.getElementById('no-result').closest('[aria-live]') ? 'in live' : 'not live']));
  await p.fill('#q', '獎學');
  await p.waitForTimeout(1500);
  log('pagefind 獎學', await p.evaluate(() => [document.getElementById('site-results').hidden, [...document.querySelectorAll('#site-results-list a')].map(a => a.textContent + ' ' + a.getAttribute('href'))]));
  await p.fill('#q', '諮商');
  await p.waitForTimeout(1500);
  log('pagefind 諮商', await p.evaluate(() => [document.getElementById('site-results').hidden, [...document.querySelectorAll('#site-results-list a')].map(a => a.textContent + ' ' + a.getAttribute('href'))]));
  // radio keyboard nav
  await p.fill('#q', '');
  await p.focus('input[name=aud][value=""]'); await p.keyboard.press('ArrowRight');
  log('arrow radio', await p.evaluate(() => [document.activeElement.value, document.getElementById('count').textContent]));
  // radio focus ring visible?
  log('radio focus span outline', await p.evaluate(() => getComputedStyle(document.activeElement.nextElementSibling).outlineStyle));
  // URL ?for= param invalid
  await p.goto(BASE + '/services/?for=%E5%83%91%E7%94%9F&q=');
  log('?for=僑生', await p.textContent('#count'));
  // sticky finder height on desktop
  log('finder height', await p.evaluate(() => document.querySelector('.finder').getBoundingClientRect().height));
  // task headings landmarks: group sections have labels?
  log('group section labelled?', await p.evaluate(() => document.querySelector('[data-group]').getAttribute('aria-labelledby')));
  await c.close();
}

// --- news filter
{
  const [c, p] = await ctx();
  await p.goto(BASE + '/news/');
  await p.check('input[name=unit][value="housing"]', { force: true });
  log('\nnews filter housing', await p.textContent('#news-count'), await p.evaluate(() => [...document.querySelectorAll('#news-wrap li')].filter(l => !l.hidden && getComputedStyle(l).display !== 'none').length));
  log('news tags sample', await p.evaluate(() => [...document.querySelectorAll('.tag')].slice(0, 6).map(t => t.textContent)));
  log('news rows on load via URL param?', 'n/a');
  await c.close();
}

// --- mobile menu
{
  const [c, p] = await ctx({ viewport: { width: 390, height: 844 }, hasTouch: true });
  await p.goto(BASE + '/');
  log('\nmenu-btn label', await p.evaluate(() => { const m = document.getElementById('menu-toggle'); return [m.getAttribute('aria-expanded'), m.textContent.trim()]; }));
  await p.focus('#menu-toggle'); await p.keyboard.press('Enter');
  log('after Enter', await p.evaluate(() => [document.getElementById('menu-toggle').getAttribute('aria-expanded'), getComputedStyle(document.getElementById('nav-list')).display]));
  await p.keyboard.press('Tab');
  log('tab after open ->', await p.evaluate(() => document.activeElement.textContent.trim()));
  await p.screenshot({ path: 'review/screenshots/audit/mobile-menu-open.png' });
  await p.keyboard.press('Escape');
  log('after Esc', await p.evaluate(() => [document.getElementById('menu-toggle').getAttribute('aria-expanded'), document.activeElement.id]));
  // touch targets
  log('small targets mobile:', JSON.stringify(await p.evaluate(() => [...document.querySelectorAll('a,button,input,[tabindex]')].filter(e => e.offsetParent).map(e => { const r = e.getBoundingClientRect(); return [ (e.textContent||e.getAttribute('aria-label')||'').trim().slice(0,12), Math.round(r.width), Math.round(r.height)]; }).filter(([, w, h]) => w < 24 || h < 24))));
  log('<44 targets count', await p.evaluate(() => [...document.querySelectorAll('a,button')].filter(e => e.offsetParent).filter(e => { const r = e.getBoundingClientRect(); return r.height < 44; }).length));
  await p.goto(BASE + '/emergency/');
  log('emerg small targets:', JSON.stringify(await p.evaluate(() => [...document.querySelectorAll('a,button')].filter(e => e.offsetParent).map(e => { const r = e.getBoundingClientRect(); return [(e.textContent||e.getAttribute('aria-label')||'').trim().slice(0,12), Math.round(r.width), Math.round(r.height)]; }).filter(([, w, h]) => w < 24 || h < 24))));
  // 110/119 in alert band size
  await p.goto(BASE + '/tasks/dorm/');
  log('alert band 110 size', await p.evaluate(() => [...document.querySelectorAll('.alert-life a')].map(a => { const r = a.getBoundingClientRect(); return [Math.round(r.width), Math.round(r.height)]; })));
  log('alert band height mobile', await p.evaluate(() => document.querySelector('.alert-band').getBoundingClientRect().height), 'header', await p.evaluate(() => document.querySelector('.site-header').getBoundingClientRect().height));
  await c.close();
}

// --- reflow 320
for (const path of ['/', '/emergency/', '/services/', '/news/', '/units/health-center/', '/tasks/dorm/']) {
  const [c, p] = await ctx({ viewport: { width: 320, height: 640 } });
  await p.goto(BASE + path); await p.evaluate(() => document.fonts.ready);
  const r = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, over: [...document.querySelectorAll('body *')].filter(e => e.getBoundingClientRect().right > document.documentElement.clientWidth + 1).slice(0, 5).map(e => e.tagName + '.' + e.className + ':' + Math.round(e.getBoundingClientRect().right)) }));
  log('\nreflow320', path, JSON.stringify(r));
  const n = path === '/' ? 'home' : path.replace(/\//g, '');
  if (path === '/' || path === '/emergency/') await p.screenshot({ path: `review/screenshots/audit/reflow320-${n}.png`, fullPage: true });
  await c.close();
}
// --- 200% zoom ≈ 720x450 CSS px
for (const path of ['/', '/services/', '/emergency/']) {
  const [c, p] = await ctx({ viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 });
  await p.goto(BASE + path);
  const r = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, sticky: document.querySelector('.site-header').getBoundingClientRect().height, alert: document.querySelector('.alert-band')?.getBoundingClientRect().height, finder: document.querySelector('.finder')?.getBoundingClientRect().height, finderPos: document.querySelector('.finder') ? getComputedStyle(document.querySelector('.finder')).position : null }));
  log('zoom200', path, JSON.stringify(r));
  const n = path === '/' ? 'home' : path.replace(/\//g, '');
  await p.screenshot({ path: `review/screenshots/audit/zoom200-${n}.png` });
  if (path === '/services/') { await p.mouse.wheel(0, 800); await p.waitForTimeout(200); await p.screenshot({ path: `review/screenshots/audit/zoom200-services-scrolled.png` }); }
  await c.close();
}
// --- reduced motion
{
  const [c, p] = await ctx({ reducedMotion: 'reduce' });
  await p.goto(BASE + '/');
  log('\nreduced motion phrase transition', await p.evaluate(() => getComputedStyle(document.querySelector('.phrase')).transitionDuration));
  await c.close();
}
// --- landmarks, headings, lang
for (const path of ['/', '/services/', '/tasks/dorm/', '/units/health-center/', '/units/', '/news/', '/emergency/']) {
  const [c, p] = await ctx();
  await p.goto(BASE + path);
  log('\nstruct', path, JSON.stringify(await p.evaluate(() => ({
    lang: document.documentElement.lang, title: document.title,
    h: [...document.querySelectorAll('h1,h2,h3')].map(h => h.tagName[1] + ':' + h.textContent.trim().slice(0, 10)).join(' '),
    landmarks: [...document.querySelectorAll('header,nav,main,aside,footer,[role=search],section[aria-labelledby]')].map(e => e.tagName.toLowerCase() + (e.getAttribute('aria-label') ? '[' + e.getAttribute('aria-label') + ']' : '')).join(','),
    vagueLinks: [...document.querySelectorAll('a')].map(a => a.textContent.trim()).filter(t => /^(來源|資料來源|更多|全部消息)$/.test(t)).length,
    extNewTab: [...document.querySelectorAll('a.ext')].filter(a => a.target).length,
    extNoSR: [...document.querySelectorAll('a .ext, a.ext')].length,
  }))));
  await c.close();
}
// --- 404
{
  const [c, p] = await ctx();
  const r = await p.goto(BASE + '/no-such-page/');
  log('\n404 status', r.status(), await p.title(), await p.textContent('h1'));
  const r2 = await p.goto('http://localhost:4321/nccu-osa-redesign/tasks/not-real/');
  log('404 task', r2.status());
  await p.screenshot({ path: 'review/screenshots/audit/404-desk-light.png' });
  await c.close();
}
await b.close();
