/**
 * Single source of truth for the public learning pages (lessons, vocabulary,
 * flashcards). Route layouts, the sitemap and /llms.txt all read from here so
 * titles, descriptions and URLs never drift apart.
 */
import { grammarTopics } from "@/data/grammar";
import { dialoguesData } from "@/data/dialogues";
import { abs, SITE } from "./site";
import { breadcrumbLd } from "./jsonld";

export type LearnPage = {
  path: string;
  title: string;          // page title (root layout appends " | KalbaLab")
  description: string;    // meta description, ~150–160 chars
  crumb: string;          // breadcrumb label
  parent?: string;        // parent path for breadcrumbs
};

export const COURSE_PATH = "/lessons";

export const LEARN_PAGES = {
  lessons: {
    path: "/lessons",
    title: "Free Lithuanian A1 Lessons Online",
    description:
      "Free structured Lithuanian A1 course: alphabet and pronunciation, grammar, everyday dialogues and reading practice — with native audio and English translations.",
    crumb: "Lessons",
  },
  fundamentals: {
    path: "/lessons/a1/fundamentals",
    title: "Lithuanian Alphabet, Pronunciation, Numbers & Days",
    description:
      "Learn the 32-letter Lithuanian alphabet and special letters (ą, č, ę, ė, į, š, ų, ū, ž), numbers 1–100, days of the week and months — all with native audio.",
    crumb: "Fundamentals",
    parent: "/lessons",
  },
  grammar: {
    path: "/lessons/a1/grammar",
    title: "Lithuanian A1 Grammar Explained Simply",
    description:
      "Beginner Lithuanian grammar with tables and audio examples: the verb būti (to be), noun gender, present tense verbs and question words.",
    crumb: "Grammar",
    parent: "/lessons",
  },
  dialogues: {
    path: "/lessons/a1/dialogues",
    title: "Lithuanian Dialogues for Beginners (A1)",
    description:
      "Everyday Lithuanian conversations with audio and translation: meeting someone, shopping, the doctor, asking directions and ordering food.",
    crumb: "Dialogues",
    parent: "/lessons",
  },
  reading: {
    path: "/lessons/a1/reading",
    title: "Lithuanian A1 Reading Practice with Translations",
    description:
      "Short Lithuanian A1 reading texts with English translations and audio — about family, the city, a working day and Lithuanian nature.",
    crumb: "Reading",
    parent: "/lessons",
  },
  vocabulary: {
    path: "/vocabulary",
    title: "Lithuanian A1 Vocabulary List with Audio",
    description:
      "220 essential Lithuanian A1 words with English translations, example sentences and native pronunciation. Free, searchable and filterable by topic.",
    crumb: "Vocabulary",
  },
  flashcards: {
    path: "/flashcards",
    title: "Lithuanian Flashcards with Audio (A1)",
    description:
      "Free Lithuanian flashcards for beginners: 220 essential A1 words with native audio, translations and example sentences. Flip, review and track what you know.",
    crumb: "Flashcards",
  },
  examGuide: {
    path: "/lithuanian-a1-exam",
    title: "Lithuanian A1 Exam 2026: Who Needs It & How to Pass",
    description:
      "Lithuanian A1 exam guide for foreigners: who needs it since 2026, the three exam parts, the €52 fee, how to register and how to prepare for free.",
    crumb: "Lithuanian A1 exam",
  },
} satisfies Record<string, LearnPage>;

export function grammarTopicPage(slug: string): LearnPage | null {
  const t = grammarTopics.find((g) => g.slug === slug);
  if (!t) return null;
  return {
    path: `/lessons/a1/grammar/${t.slug}`,
    title: `${t.title_en}: Lithuanian ${t.level} Grammar`,
    description: `${t.description_en} With tables, examples and native audio.`,
    crumb: t.title_en,
    parent: LEARN_PAGES.grammar.path,
  };
}

export function dialoguePage(slug: string): LearnPage | null {
  const d = dialoguesData.find((x) => x.slug === slug);
  if (!d) return null;
  return {
    path: `/lessons/a1/dialogues/${d.slug}`,
    title: `${d.title_en} (${d.title_lt}) — Lithuanian Dialogue`,
    description: `${d.scenario_en} With native audio and English translation.`,
    crumb: d.title_en,
    parent: LEARN_PAGES.dialogues.path,
  };
}

/** Every public learning URL — used by sitemap.ts and /llms.txt. */
export function allLearnPages(): LearnPage[] {
  const topics = grammarTopics.map((t) => grammarTopicPage(t.slug)).filter((p): p is LearnPage => p !== null);
  const dialogues = dialoguesData.map((d) => dialoguePage(d.slug)).filter((p): p is LearnPage => p !== null);
  return [...Object.values(LEARN_PAGES), ...topics, ...dialogues];
}

/** Home › … › page breadcrumb JSON-LD, walking up `parent` links. */
export function learnBreadcrumbLd(page: LearnPage) {
  const byPath = new Map<string, LearnPage>(allLearnPages().map((p) => [p.path, p]));
  const chain: LearnPage[] = [];
  for (let p: LearnPage | undefined = page; p; p = p.parent ? byPath.get(p.parent) : undefined) {
    chain.unshift(p);
  }
  return breadcrumbLd([
    { name: "Home", url: SITE.url },
    ...chain.map((p) => ({ name: p.crumb, url: abs(p.path) })),
  ]);
}
