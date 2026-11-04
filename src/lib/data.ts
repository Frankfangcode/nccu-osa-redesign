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

export const audiences = ['新生', '在學生', '研究生', '僑生', '陸生', '境外生'];

export const taskGroups = Array.from(new Set(tasks.map((t) => t.group)));

export const tel = (p: string) => `tel:${p.replace(/[^\d+]/g, '')}`;
