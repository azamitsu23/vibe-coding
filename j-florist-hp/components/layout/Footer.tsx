import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">
              葬儀専門のお花屋さん
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              ご遺族の想いを大切に、真心込めて葬儀・法要のお花をご提供しております。
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">メニュー</h4>
            <nav className="space-y-2">
              <Link
                href="/news"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                お知らせ
              </Link>
              <Link
                href="/service"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                サービス内容
              </Link>
              <Link
                href="/catalog"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                商品カタログ
              </Link>
              <Link
                href="/access"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                アクセス
              </Link>
              <Link
                href="/contact"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                お問い合わせ
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">お問い合わせ</h4>
            <div className="text-gray-400 space-y-2 text-sm">
              <p>営業時間：9:00〜18:00</p>
              <p>定休日：年中無休</p>
              <p className="mt-4">
                <Link
                  href="/contact"
                  className="inline-block px-6 py-2 bg-brand-yellow text-gray-900 font-bold rounded hover:bg-brand-orange hover:text-white transition-colors"
                >
                  お問い合わせ
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} 葬儀専門のお花屋さん. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
