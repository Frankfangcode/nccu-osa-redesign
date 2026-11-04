import unitsRaw from '../data/units.json';
import newsRaw from '../data/news.json';
import tasksRaw from '../data/tasks.json';
import emergencyRaw from '../data/emergency.json';

export type Link = { title: string; url: string };
export type Unit = {
  slug: string;
  name: string;
  shortName: string;
  parent: string;
  summary: string;
  officialUrl: string;
  newsUrl: string | null;
  contact: { phone: string | null; email: string | null; location: string | null; hours: string | null };
  sections: { title: string; links: Link[] }[];
  verified: boolean;
};
export type News = { title: string; date: string; unit: string; url: string; category: string };
export type Task = {
  slug: string;
  phrase: string; // completes 「我想……」
  title: string;
  summary: string;
  group: string;
  audiences: string[];
  unit: string;
  links: Link[];
  keywords: string[];
  featured?: boolean;
  order?: number;
};
export type Line = {
  name: string;
  phone: string;
  hours: string;
  scope: 'campus' | 'national';
  description: string;
  sourceUrl: string;
};

export const units = unitsRaw as Unit[];
export const news = (newsRaw as News[]).slice().sort((a, b) => b.date.localeCompare(a.date));
export const tasks = tasksRaw as Task[];
export const lines = emergencyRaw as Line[];

export const unitBySlug = (slug: string) => units.find((u) => u.slug === slug);
export const tasksForUnit = (slug: string) => tasks.filter((t) => t.unit === slug);

export const audiences = ['新生', '在學生', '研究生', '僑生', '陸生', '原民生'];

export const taskGroups = Array.from(new Set(tasks.map((t) => t.group)));

export const featuredTasks = tasks
  .filter((t) => t.featured)
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

/**
 * Source phone fields often carry extensions and notes
 * (e.g. "0919-099-119（校內分機 66119）"). Take the first dialable number.
 */
export function phoneMain(p: string): string {
  const m = p.match(/0\d{1,3}[-\s]?\d{3,4}[-\s]?\d{3,4}|0800[-\s]?\d{3}[-\s]?\d{3}|\b\d{3,4}\b/);
  return m ? m[0].trim() : p;
}
/** Whatever follows the main number, e.g. "（校內分機 66119）". */
export function phoneNote(p: string): string {
  const main = phoneMain(p);
  const i = p.indexOf(main);
  return i === -1 ? '' : p.slice(i + main.length).replace(/^[\s/／;；]+/, '').trim();
}
/** True only when the source states the line is staffed around the clock. */
export const is24h = (l: Line) => /^\s*24\s*小時/.test(l.hours);
export const campus24h = () => lines.filter((l) => l.scope === 'campus' && is24h(l));

export const tel = (p: string) => `tel:${phoneMain(p).replace(/[^\d+]/g, '')}`;
