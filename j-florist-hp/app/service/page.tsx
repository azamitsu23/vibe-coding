import { Metadata } from "next";
import SectionWrapper from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "サービス内容",
  description: "葬儀・法要向けのお花のご提供から配送まで、当店のサービス内容をご紹介します。",
};

const services = [
  {
    title: "供花（くげ）",
    description: "葬儀式場や自宅葬にお届けする供花です。故人を偲び、ご遺族を慰めるお花を真心込めてお作りします。",
    features: ["各式場への配送対応", "名札・リボンの無料サービス", "当日朝の配送可能"],
  },
  {
    title: "祭壇花",
    description: "故人様を彩る祭壇のお花です。式場の雰囲気やご予算に合わせて、美しく格調高い祭壇花をご提案いたします。",
    features: ["豊富なデザイン", "式場との連携対応", "事前見積もり無料"],
  },
  {
    title: "枕花（まくらばな）",
    description: "ご自宅や病院で故人様の枕元にお供えするお花です。速やかに真心のこもったお花をお届けいたします。",
    features: ["24時間対応可能", "急ぎの配送対応", "コンパクトなサイズから対応"],
  },
  {
    title: "法要花",
    description: "四十九日、一周忌など各種法要に適したお花をご用意いたします。",
    features: ["各種法要に対応", "寺院・会館への配送", "事前予約で割引あり"],
  },
];

const areas = [
  "配達エリア：〇〇市全域",
  "近隣エリア：△△市、××市（要相談）",
  "配送時間：午前9時〜午後6時",
  "緊急対応：お電話にてご相談ください",
];

export default function ServicePage() {
  return (
    <>
      <SectionWrapper>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            サービス内容
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            葬儀・法要のお花を専門に、長年の経験と真心込めたサービスをご提供しております。
            <br />
            ご遺族の想いに寄り添い、故人様を美しく送るお手伝いをいたします。
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-sm border border-gray-100"
            >
              <h2 className="text-2xl font-serif font-bold mb-4">
                {service.title}
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-brand-orange mt-0.5 mr-2 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-brand-beige">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">
            配達エリア・対応時間
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <ul className="space-y-4">
              {areas.map((area, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="w-6 h-6 text-brand-orange mt-0.5 mr-3 flex-shrink-0"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-lg text-gray-700">{area}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-700 mb-6">
              配達エリア外の場合もお気軽にご相談ください。
              <br />
              可能な限り対応させていただきます。
            </p>
            <a
              href="/contact"
              className="inline-block px-10 py-4 bg-brand-yellow text-gray-900 font-bold text-lg rounded-lg hover:bg-brand-orange hover:text-white transition-colors"
            >
              お問い合わせ
            </a>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">
            ご注文の流れ
          </h2>
          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "お問い合わせ",
                description: "お電話またはお問い合わせフォームよりご連絡ください",
              },
              {
                step: "2",
                title: "ご相談・お見積もり",
                description: "ご予算やご希望に合わせて最適なプランをご提案します",
              },
              {
                step: "3",
                title: "ご注文確定",
                description: "内容をご確認いただき、ご注文を確定します",
              },
              {
                step: "4",
                title: "制作・配送",
                description: "真心込めてお作りし、ご指定の場所へお届けします",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-start text-left bg-white p-6 rounded-lg shadow-sm"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold text-xl mr-6">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
