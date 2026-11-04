const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Build an internal URL that respects the GitHub Pages base path. */
export function url(path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

export function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${y}.${m}.${d}`;
}
