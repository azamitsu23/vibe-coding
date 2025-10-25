import Hero from "@/components/layout/Hero";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { getNews } from "@/lib/notion/news";

export const revalidate = 300; // ISR: 5分ごとに再生成

export default async function HomePage() {
  const news = await getNews(3); // 最新3件のお知らせを取得

  return (
    <>
      <Hero />

      <SectionWrapper id="about">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            葬儀専門のお花屋さん
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            ご遺族の想いを大切に、真心込めて葬儀・法要のお花をご提供しております。
          </p>
          <p className="text-gray-600 leading-relaxed">
            長年の経験と地域密着のサービスで、迅速かつ丁寧な対応をお約束いたします。
            お急ぎの場合もお気軽にご相談ください。
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper id="news" className="bg-brand-beige">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
          お知らせ
        </h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {news.length > 0 ? (
            news.map((item) => (
              <a
                key={item.id}
                href={`/news/${item.slug}`}
                className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <time className="text-sm text-gray-500">
                  {new Date(item.published_at).toLocaleDateString("ja-JP")}
                </time>
                <h3 className="text-xl font-bold mt-2">{item.title}</h3>
              </a>
            ))
          ) : (
            <p className="text-center text-gray-500">現在お知らせはありません</p>
          )}
        </div>
        <div className="text-center mt-8">
          <a
            href="/news"
            className="inline-block px-8 py-3 bg-brand-orange text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
          >
            お知らせ一覧を見る
          </a>
        </div>
      </SectionWrapper>

      <SectionWrapper id="cta">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            お問い合わせ
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            ご不明な点やご相談がございましたら、お気軽にお問い合わせください。
          </p>
          <a
            href="/contact"
            className="inline-block px-10 py-4 bg-brand-yellow text-gray-900 font-bold text-lg rounded-lg hover:bg-brand-orange hover:text-white transition-colors"
          >
            お問い合わせフォーム
          </a>
        </div>
      </SectionWrapper>
    </>
  );
}
