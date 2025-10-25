import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNews, getNewsBySlug } from "@/lib/notion/news";
import SectionWrapper from "@/components/ui/SectionWrapper";

export const revalidate = 300; // ISR: 5分ごとに再生成

export async function generateStaticParams() {
  const news = await getNews();
  return news.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const newsItem = await getNewsBySlug(slug);

  if (!newsItem) {
    return {
      title: "お知らせが見つかりません",
    };
  }

  return {
    title: newsItem.title,
    description: newsItem.title,
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const newsItem = await getNewsBySlug(slug);

  if (!newsItem) {
    notFound();
  }

  return (
    <SectionWrapper>
      <article className="max-w-3xl mx-auto">
        <div className="mb-8">
          <time className="text-sm text-gray-500 font-medium">
            {new Date(newsItem.published_at).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h1 className="text-3xl md:text-4xl font-serif font-bold mt-3 mb-8">
            {newsItem.title}
          </h1>
        </div>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: newsItem.content }}
        />

        <div className="mt-12 pt-8 border-t">
          <a
            href="/news"
            className="inline-flex items-center text-brand-orange hover:text-brand-yellow font-medium transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
            お知らせ一覧に戻る
          </a>
        </div>
      </article>
    </SectionWrapper>
  );
}
