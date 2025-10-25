"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-100 via-brand-beige to-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center z-10 px-4"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-900 mb-6">
          真心を込めて
          <br />
          想いをお花に託す
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          葬儀・法要のお花を、迅速かつ丁寧にお届けします
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/catalog"
            className="px-8 py-4 bg-brand-yellow text-gray-900 font-bold text-lg rounded-lg hover:bg-brand-orange hover:text-white transition-colors"
          >
            商品カタログを見る
          </a>
          <a
            href="/contact"
            className="px-8 py-4 bg-white text-gray-900 font-bold text-lg rounded-lg border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
          >
            お問い合わせ
          </a>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-brand-yellow rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-brand-orange rounded-full blur-3xl" />
      </div>
    </section>
  );
}
