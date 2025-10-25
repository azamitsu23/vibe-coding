import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCatalog, getCatalogById } from "@/lib/notion/catalog";
import SectionWrapper from "@/components/ui/SectionWrapper";

export const revalidate = 300; // ISR: 5分ごとに再生成

export async function generateStaticParams() {
  const catalog = await getCatalog();
  return catalog.map((item) => ({
    id: item.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = await getCatalogById(id);

  if (!item) {
    return {
      title: "商品が見つかりません",
    };
  }

  return {
    title: item.name,
    description: item.description || item.name,
    openGraph: item.image_url
      ? {
          images: [item.image_url],
        }
      : undefined,
  };
}

export default async function CatalogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getCatalogById(id);

  if (!item) {
    notFound();
  }

  return (
    <SectionWrapper>
      <article className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Image */}
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            {item.image_url ? (
              <Image
                src={item.image_url}
                alt={item.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                画像がありません
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="text-sm text-brand-orange font-medium mb-3">
              {item.category}
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              {item.name}
            </h1>

            {item.description && (
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                {item.description}
              </p>
            )}

            {item.price && (
              <div className="mb-8">
                <div className="text-sm text-gray-600 mb-1">価格</div>
                <div className="text-3xl font-bold text-brand-orange">
                  {item.price}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="space-y-4">
              <a
                href="/contact"
                className="block w-full text-center px-8 py-4 bg-brand-yellow text-gray-900 font-bold text-lg rounded-lg hover:bg-brand-orange hover:text-white transition-colors"
              >
                この商品について問い合わせる
              </a>
              <a
                href="/catalog"
                className="block w-full text-center px-8 py-4 bg-white text-gray-900 font-bold text-lg rounded-lg border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
              >
                カタログ一覧に戻る
              </a>
            </div>
          </div>
        </div>

        {/* Content */}
        {item.content && (
          <div className="prose prose-lg max-w-none bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-serif font-bold mb-4">商品詳細</h2>
            <div dangerouslySetInnerHTML={{ __html: item.content }} />
          </div>
        )}
      </article>
    </SectionWrapper>
  );
}
