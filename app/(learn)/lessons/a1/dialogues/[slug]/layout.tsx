import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SEO } from "@/components/seo/SEO";
import { buildMetadata } from "@/lib/seo/metadata";
import { learningResourceLd } from "@/lib/seo/jsonld";
import { abs } from "@/lib/seo/site";
import { COURSE_PATH, dialoguePage, learnBreadcrumbLd } from "@/lib/seo/learn";
import { dialoguesData } from "@/data/dialogues";

type Props = { children: React.ReactNode; params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return dialoguesData.map((x) => ({ slug: x.slug }));
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const page = dialoguePage((await params).slug);
  return page ? buildMetadata(page) : {};
}

export default async function DialogueLayout({ children, params }: Props) {
  const page = dialoguePage((await params).slug);
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
            teaches: "Everyday Lithuanian conversation",
            learningResourceType: "Dialogue",
            isPartOf: abs(COURSE_PATH),
          }),
        ]}
      />
      {children}
    </>
  );
}
