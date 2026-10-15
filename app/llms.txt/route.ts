// /llms.txt — a plain-Markdown site summary for AI answer engines
// (ChatGPT, Claude, Perplexity, Gemini…), following https://llmstxt.org.
// Generated from the same config as the sitemap so it never goes stale.
import { SITE, abs } from "@/lib/seo/site";
import { allLearnPages } from "@/lib/seo/learn";
import { vocabularyData } from "@/data/vocabulary";

export const dynamic = "force-static";

const INFO_PAGES = [
  { path: "/faq", title: "FAQ", description: "Common questions about learning Lithuanian and the A1 exam." },
  { path: "/blog", title: "Blog", description: "Guides on Lithuanian grammar, vocabulary and exam preparation." },
  { path: "/about", title: "About", description: "Who builds KalbaLab and why." },
  { path: "/contact", title: "Contact", description: "Questions, feedback and translation corrections." },
];

function link(path: string, title: string, description: string) {
  return `- [${title}](${abs(path)}): ${description}`;
}

export function GET() {
  const body = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    "KalbaLab is a free website for learning Lithuanian (lietuvių kalba) from zero to A1 level.",
    "It is aimed at the international community living in Lithuania — students, workers and families —",
    "and at anyone preparing for the Lithuanian A1 state language exam. Every Lithuanian word has native",
    "audio and an English translation; explanations are also available in Bengali and other languages.",
    `The vocabulary list currently covers ${vocabularyData.length} essential A1 words. Lessons, vocabulary and flashcards are free and need no account.`,
    "",
    "## Learn Lithuanian",
    "",
    ...allLearnPages().map((p) => link(p.path, p.title, p.description)),
    "",
    "## Optional",
    "",
    ...INFO_PAGES.map((p) => link(p.path, p.title, p.description)),
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
