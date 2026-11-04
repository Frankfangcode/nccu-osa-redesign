/** 產生含 base path 的站內連結，結尾一律加 / */
export const url = (p = '') => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const path = p.replace(/^\//, '');
  if (!path) return `${base}/`;
  const [clean, hash] = path.split('#');
  const withSlash = /\.[a-z0-9]+$/i.test(clean) || clean.endsWith('/') ? clean : `${clean}/`;
  return `${base}/${withSlash}${hash ? `#${hash}` : ''}`;
};
