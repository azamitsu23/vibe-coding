import { Metadata } from "next";
import SectionWrapper from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "アクセス",
  description: "店舗の所在地、営業時間、アクセス方法をご案内します。",
};

export default function AccessPage() {
  return (
    <SectionWrapper>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-16">
          アクセス
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Shop Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-serif font-bold mb-6">店舗情報</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    店名
                  </h3>
                  <p className="text-lg font-bold">葬儀専門のお花屋さん</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    住所
                  </h3>
                  <p className="text-lg">
                    〒000-0000
                    <br />
                    〇〇県〇〇市〇〇町1-2-3
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    電話番号
                  </h3>
                  <p className="text-lg">
                    <a
                      href="tel:0000000000"
                      className="text-brand-orange hover:text-brand-yellow font-bold"
                    >
                      000-000-0000
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold mb-6">営業時間</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    営業時間
                  </h3>
                  <p className="text-lg font-bold">9:00 〜 18:00</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    定休日
                  </h3>
                  <p className="text-lg font-bold">年中無休</p>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    ※ 葬儀のお花は緊急を要するため、営業時間外でもお電話にてご相談を承ります。
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold mb-6">
                アクセス方法
              </h2>
              <div className="bg-white p-6 rounded-lg shadow-sm space-y-3">
                <div className="flex items-start">
                  <svg
                    className="w-6 h-6 text-brand-orange mt-1 mr-3 flex-shrink-0"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                  </svg>
                  <div>
                    <h3 className="font-bold mb-1">お車でお越しの場合</h3>
                    <p className="text-gray-700">
                      〇〇ICより車で約15分
                      <br />
                      駐車場：3台完備
                    </p>
                  </div>
                </div>
                <div className="flex items-start pt-3">
                  <svg
                    className="w-6 h-6 text-brand-orange mt-1 mr-3 flex-shrink-0"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <div>
                    <h3 className="font-bold mb-1">公共交通機関の場合</h3>
                    <p className="text-gray-700">
                      〇〇駅より徒歩10分
                      <br />
                      〇〇バス停より徒歩3分
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div>
            <h2 className="text-2xl font-serif font-bold mb-6">地図</h2>
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-sm aspect-square lg:aspect-auto lg:h-full min-h-[400px]">
              {/* Google Maps Embed - Replace with your actual location */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.8277804260634!2d139.76454!3d35.68123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188bfbd89f700b%3A0x277c49ba34ed38!2z5p2x5Lqs6aeF!5e0!3m2!1sja!2sjp!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="店舗の地図"
              />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-brand-beige p-12 rounded-lg">
          <h2 className="text-2xl font-serif font-bold mb-4">
            ご来店予約・お問い合わせ
          </h2>
          <p className="text-gray-700 mb-6">
            事前にご予約いただくとスムーズにご案内できます。
            <br />
            お気軽にお問い合わせください。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0000000000"
              className="inline-block px-10 py-4 bg-brand-orange text-white font-bold text-lg rounded-lg hover:opacity-90 transition-opacity"
            >
              電話で問い合わせる
            </a>
            <a
              href="/contact"
              className="inline-block px-10 py-4 bg-brand-yellow text-gray-900 font-bold text-lg rounded-lg hover:bg-brand-orange hover:text-white transition-colors"
            >
              お問い合わせフォーム
            </a>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
