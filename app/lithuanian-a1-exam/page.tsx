import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { InfoPageShell, ContentCard } from "@/components/ui/InfoPageShell";
import { SEO } from "@/components/seo/SEO";
import { buildMetadata } from "@/lib/seo/metadata";
import { faqLd } from "@/lib/seo/jsonld";
import { LEARN_PAGES, learnBreadcrumbLd } from "@/lib/seo/learn";

const page = LEARN_PAGES.examGuide;

export const metadata = buildMetadata(page);

// Facts below were checked against the official sources listed at the bottom
// of the page. Update LAST_CHECKED whenever you re-verify them.
const LAST_CHECKED = "16 October 2026";
const REGISTRATION_URL = "https://eksternams.nsa.smm.lt";

const SOURCES = [
  { href: "https://www.nsa.smsm.lt/duk/lietuviu-kalbos-egzaminas-uzsienieciams/", label: "National Agency for Education (NŠA) — Lithuanian exam for foreigners (FAQ)" },
  { href: "https://www.nsa.smsm.lt/2026/01/14/siandien-vyksta-pirmasis-a1-lygio-lietuviu-kalbos-egzaminas-uzsienieciams/", label: "NŠA — first A1 exam for foreigners, 14 January 2026" },
  { href: "https://www.nsa.smsm.lt/2026/09/30/papildomi-valstybines-kalbos-mokejimo-egzaminai-uzsienieciams/", label: "NŠA — additional exams for foreigners (autumn 2026)" },
  { href: "https://vki.lrv.lt/lt/informacija-kitakalbiams/valstybines-kalbos-mokejimo-egzaminu-laikymas/", label: "State Language Inspectorate (VKI) — taking the state language exam" },
  { href: "https://www.migracija.lt/en/ilgalaikis-gyvenimas", label: "Migration Department — long-term (permanent) residence" },
];

const FAQ = [
  {
    question: "Who needs the Lithuanian A1 exam?",
    answer:
      "Since 1 January 2026, people who serve customers directly must be able to serve them in Lithuanian at least at A1 level. For foreigners working in service and trade jobs, A1 applies for two years from when they first received a document giving the right to live in Lithuania; after that, A2 is required to keep working in those roles.",
  },
  {
    question: "Is A1 enough for a permanent residence permit?",
    answer:
      "No. For permanent residence you need A2 in every part of the exam (reading and writing, listening, speaking) and you must also pass the exam on the basics of the Constitution. Register for these through your Migris account.",
  },
  {
    question: "What is in the Lithuanian A1 exam?",
    answer:
      "Three parts: a reading and writing test, a listening task, and a short conversation with an examiner (speaking). The result is simply Passed or Failed.",
  },
  {
    question: "How much does the exam cost and how do I register?",
    answer:
      "The 2026 fee is €52. Register online at eksternams.nsa.smm.lt — registration opens 30 days before an exam and closes 7 days before it, and your place is confirmed once you pay.",
  },
  {
    question: "When do I get my results?",
    answer:
      "Results appear in your eksternams.nsa.smm.lt account within 15 working days. The certificate is issued within 7 working days after that and sent to your exam school, which hands it out within 3 working days.",
  },
  {
    question: "Does a Lithuanian course certificate replace the exam?",
    answer: "No. A certificate from a language course is not equivalent to the state exam.",
  },
];

const PREP_LINKS = [
  { href: LEARN_PAGES.fundamentals.path, label: "Alphabet & pronunciation", note: "Read and say every word correctly" },
  { href: LEARN_PAGES.vocabulary.path, label: "220 A1 words", note: "The vocabulary the exam expects" },
  { href: LEARN_PAGES.dialogues.path, label: "Everyday dialogues", note: "Practise the speaking part" },
  { href: LEARN_PAGES.reading.path, label: "Reading practice", note: "Short A1 texts with translations" },
  { href: LEARN_PAGES.grammar.path, label: "A1 grammar", note: "būti, gender, present tense, questions" },
  { href: LEARN_PAGES.flashcards.path, label: "Flashcards", note: "Review a few minutes every day" },
];

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-bold text-gray-100 mb-3">{children}</h2>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-gray-300 leading-relaxed mb-3">{children}</p>;
}

const A = "text-amber-400 hover:text-amber-300 underline underline-offset-2";

export default function LithuanianA1ExamPage() {
  return (
    <>
      <SEO blocks={[learnBreadcrumbLd(page), faqLd(FAQ)]} />
      <InfoPageShell
        eyebrow="Exam guide"
        title="Lithuanian A1 Language Exam: 2026 Guide"
        lead="Who has to take it, what the three parts look like, how to register, what it costs — and how to prepare for free."
      >
        <div className="space-y-6">
          <p className="text-xs text-gray-500">
            Last checked against official sources: {LAST_CHECKED}. Rules and dates can change — always confirm on the{" "}
            <a href={SOURCES[0].href} target="_blank" rel="noopener" className={A}>NŠA website</a> before you register.
          </p>

          <ContentCard>
            <H2>Who needs the A1 exam?</H2>
            <P>
              An amendment to the Law on the State Language took effect on <strong>1 January 2026</strong>: people who
              serve customers directly must be able to do it in Lithuanian at <strong>at least A1 level</strong>.
            </P>
            <P>
              For foreigners working in <strong>service and trade jobs</strong>, the A1 level applies for{" "}
              <strong>two years</strong>, counted from when you first received a document giving you the right to live
              in Lithuania. After those two years you need <strong>A2</strong> to keep working in these roles.
            </P>
            <P>
              <strong>Applying for permanent residence?</strong> A1 is not enough. You need <strong>A2 in every part</strong>{" "}
              of the exam (reading and writing, listening, speaking) plus the exam on the basics of the Constitution, and you
              register through your <strong>Migris</strong> account.
            </P>
          </ContentCard>

          <ContentCard>
            <H2>What the exam looks like</H2>
            <P>The exam checks reading, writing, listening and speaking in three parts:</P>
            <ol className="list-decimal pl-5 space-y-1.5 text-gray-300 mb-3">
              <li><strong>Reading and writing</strong> — a written test.</li>
              <li><strong>Listening</strong> — understanding short spoken Lithuanian.</li>
              <li><strong>Speaking</strong> — a short conversation with an examiner.</li>
            </ol>
            <P>The result is simply <strong>Passed</strong> or <strong>Failed</strong> (Išlaikyta / Neišlaikyta).</P>
          </ContentCard>

          <ContentCard>
            <H2>How to register — step by step</H2>
            <ol className="list-decimal pl-5 space-y-2 text-gray-300">
              <li>
                Create an account and choose an exam date at{" "}
                <a href={REGISTRATION_URL} target="_blank" rel="noopener" className={A}>eksternams.nsa.smm.lt</a>.
                Registration opens <strong>30 days</strong> before the exam and closes <strong>7 days</strong> before it.
              </li>
              <li>Pay the fee — <strong>€52 in 2026</strong>. Your registration is confirmed only after payment.</li>
              <li>
                You take the exam at a designated school in <strong>your own municipality</strong>. If it is full, you are
                offered another one.
              </li>
              <li>On the day, bring an <strong>identity document</strong> and arrive <strong>30 minutes early</strong>.</li>
              <li>
                Results appear in your account within <strong>15 working days</strong>. The certificate follows within
                about 10 working days and is handed out at your exam school.
              </li>
            </ol>
          </ContentCard>

          <ContentCard>
            <H2>2026 exam dates</H2>
            <P>
              NŠA planned <strong>15 A1 exams in 2026</strong> and added extra A1–A2 sessions on <strong>22 October</strong>{" "}
              and <strong>19 November 2026</strong>. The full timetable is on the{" "}
              <a href={SOURCES[2].href} target="_blank" rel="noopener" className={A}>NŠA website</a>.
            </P>
          </ContentCard>

          <ContentCard>
            <H2>Prepare for free with KalbaLab</H2>
            <P>Everything below is free and works without an account. Every Lithuanian word has native audio.</P>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PREP_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/3 px-4 py-3 hover:border-amber-500/40 transition-colors"
                >
                  <span>
                    <span className="block text-gray-100 font-medium">{l.label}</span>
                    <span className="block text-xs text-gray-500">{l.note}</span>
                  </span>
                  <ArrowRight size={16} className="text-gray-500 group-hover:text-amber-400 transition-colors" />
                </Link>
              ))}
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Want timed practice tests for each part? <Link href="/exam-prep" className={A}>Exam Prep</Link> is free with an account.
            </p>
          </ContentCard>

          <ContentCard>
            <H2>Frequently asked questions</H2>
            <div className="space-y-4">
              {FAQ.map((f) => (
                <div key={f.question}>
                  <h3 className="text-gray-100 font-semibold mb-1">{f.question}</h3>
                  <p className="text-gray-300 leading-relaxed">{f.answer}</p>
                </div>
              ))}
            </div>
          </ContentCard>

          <ContentCard>
            <H2>Official sources</H2>
            <ul className="list-disc pl-5 space-y-1.5 text-sm">
              {SOURCES.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener" className={A}>{s.label}</a>
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-500 mt-3">
              KalbaLab is an independent learning site, not an official exam body. This page is a plain-language summary,
              not legal advice.
            </p>
          </ContentCard>
        </div>
      </InfoPageShell>
    </>
  );
}
