import { Metadata } from "next";
import ContactForm from "@/components/ui/ContactForm";
import SectionWrapper from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "葬儀・法要のお花に関するお問い合わせはこちらから。お急ぎの場合はお電話でも承ります。",
};

export default function ContactPage() {
  return (
    <SectionWrapper>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-8">
          お問い合わせ
        </h1>

        <p className="text-center text-lg text-gray-700 mb-12">
          葬儀・法要のお花に関するご相談、ご注文はお気軽にお問い合わせください。
          <br />
          お急ぎの場合はお電話でも承ります。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-brand-beige p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-3 flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-brand-orange"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              お電話でのお問い合わせ
            </h2>
            <p className="text-3xl font-bold text-brand-orange mb-2">
              <a href="tel:0000000000" className="hover:text-brand-yellow transition-colors">
                000-000-0000
              </a>
            </p>
            <p className="text-sm text-gray-600">
              受付時間：9:00〜18:00（年中無休）
              <br />
              ※ 緊急時は営業時間外でも対応いたします
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-100">
            <h2 className="text-xl font-bold mb-3 flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-brand-orange"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              営業時間
            </h2>
            <p className="text-gray-700 mb-4">
              <strong className="text-lg">9:00 〜 18:00</strong>
              <br />
              定休日：年中無休
            </p>
            <p className="text-sm text-gray-600">
              フォームでのお問い合わせは24時間受付中です。
              営業時間内に順次ご対応させていただきます。
            </p>
          </div>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-lg shadow-sm">
          <h2 className="text-2xl font-serif font-bold mb-8 text-center">
            お問い合わせフォーム
          </h2>
          <ContactForm />
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="font-bold mb-3 text-center">個人情報の取り扱いについて</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            お客様からいただいた個人情報は、お問い合わせへの回答およびサービスのご案内にのみ使用し、
            適切に管理いたします。第三者に開示・提供することはございません。
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
