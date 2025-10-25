import { Metadata } from "next";
import Image from "next/image";
import { getCatalog, getCategories } from "@/lib/notion/catalog";
import SectionWrapper from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "商品カタログ",
  description: "葬儀・法要向けのお花のカタログです。供花、祭壇花、枕花など各種取り揃えております。",
};

export const revalidate = 300; // ISR: 5分ごとに再生成

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const [catalog, categories] = await Promise.all([
    getCatalog(category),
    getCategories(),
  ]);

  return (
    <SectionWrapper>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12">
          商品カタログ
        </h1>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <a
              href="/catalog"
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                !category
                  ? "bg-brand-orange text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              すべて
            </a>
            {categories.map((cat) => (
              <a
                key={cat}
                href={`/catalog?category=${encodeURIComponent(cat)}`}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  category === cat
                    ? "bg-brand-orange text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </a>
            ))}
          </div>
        )}

        {/* Catalog Grid */}
        {catalog.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {catalog.map((item) => (
              <a
                key={item.id}
                href={`/catalog/${item.id}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden border border-gray-100"
              >
                {item.image_url && (
                  <div className="relative h-64 bg-gray-100">
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="text-sm text-brand-orange font-medium mb-2">
                    {item.category}
                  </div>
                  <h2 className="text-xl font-bold mb-3">{item.name}</h2>
                  {item.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  {item.price && (
                    <p className="text-lg font-bold text-brand-orange">
                      {item.price}
                    </p>
                  )}
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              {category
                ? "このカテゴリの商品は現在ありません"
                : "現在商品はありません"}
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center bg-brand-beige p-12 rounded-lg">
          <h2 className="text-2xl font-serif font-bold mb-4">
            お問い合わせ・ご相談
          </h2>
          <p className="text-gray-700 mb-6">
            商品についてのご質問やご注文は、お気軽にお問い合わせください。
          </p>
          <a
            href="/contact"
            className="inline-block px-10 py-4 bg-brand-yellow text-gray-900 font-bold text-lg rounded-lg hover:bg-brand-orange hover:text-white transition-colors"
          >
            お問い合わせフォーム
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
