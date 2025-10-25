import { Metadata } from "next";
import { getNews } from "@/lib/notion/news";
import SectionWrapper from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "お知らせ",
  description: "最新のお知らせ・お得な情報をご確認いただけます。",
};

export const revalidate = 300; // ISR: 5分ごとに再生成

export default async function NewsPage() {
  const news = await getNews();

  return (
    <SectionWrapper>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12">
          お知らせ
        </h1>

        {news.length > 0 ? (
          <div className="space-y-6">
            {news.map((item) => (
              <a
                key={item.id}
                href={`/news/${item.slug}`}
                className="block bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
              >
                <time className="text-sm text-gray-500 font-medium">
                  {new Date(item.published_at).toLocaleDateString("ja-JP", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h2 className="text-2xl font-bold mt-3 mb-2 hover:text-brand-orange transition-colors">
                  {item.title}
                </h2>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">現在お知らせはありません</p>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
