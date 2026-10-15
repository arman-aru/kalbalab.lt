import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SEO } from "@/components/seo/SEO";
import { buildMetadata } from "@/lib/seo/metadata";
import { learningResourceLd } from "@/lib/seo/jsonld";
import { abs } from "@/lib/seo/site";
import { COURSE_PATH, grammarTopicPage, learnBreadcrumbLd } from "@/lib/seo/learn";
import { grammarTopics } from "@/data/grammar";

type Props = { children: React.ReactNode; params: Promise<{ topic: string }> };

export function generateStaticParams() {
  return grammarTopics.map((x) => ({ topic: x.slug }));
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const page = grammarTopicPage((await params).topic);
  return page ? buildMetadata(page) : {};
}

export default async function GrammarTopicLayout({ children, params }: Props) {
  const page = grammarTopicPage((await params).topic);
  if (!page) notFound();
  return (
    <>
      <SEO
        blocks={[
          learnBreadcrumbLd(page),
          learningResourceLd({
            url: abs(page.path),
            name: page.title,
            description: page.description,
            educationalLevel: "A1",
            teaches: page.crumb,
            learningResourceType: "Lesson",
            isPartOf: abs(COURSE_PATH),
          }),
        ]}
      />
      {children}
    </>
  );
}
