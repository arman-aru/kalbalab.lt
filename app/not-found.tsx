import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

const SUGGESTIONS = [
  { href: "/lessons", label: "Lessons" },
  { href: "/vocabulary", label: "Vocabulary" },
  { href: "/flashcards", label: "Flashcards" },
];

export default function NotFound() {
  return (
    <section className="max-w-xl mx-auto px-4 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">404</p>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-3">Page not found</h1>
      <p className="text-gray-400 mb-8">
        This page doesn&apos;t exist or has moved. Try one of these instead:
      </p>
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {SUGGESTIONS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="card-surface px-4 py-2 text-sm text-gray-200 hover:text-amber-400 transition-colors"
          >
            {s.label}
          </Link>
        ))}
      </div>
      <Link
        href="/"
        className="inline-flex items-center px-5 py-2.5 rounded-xl bg-amber-500 text-black font-semibold text-sm hover:bg-amber-400 transition-colors"
      >
        Back to home
      </Link>
    </section>
  );
}
