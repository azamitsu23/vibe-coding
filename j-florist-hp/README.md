# 葬儀専門のお花屋さんホームページ

葬儀向けに特化したフラワーショップの公式Webサイトです。

## 概要

葬儀・法要向けの花のカタログ表示と問い合わせ受付を中心とした、信頼性の高い情報提供サイトです。
NotionをヘッドレスCMSとして活用し、管理者が簡単にコンテンツを更新できる仕組みを実現しています。

## 主な機能

- **商品カタログ**: Notion APIから商品情報を取得し、カテゴリ別にフィルタリング可能
- **お知らせ**: 最新情報をNotion経由で管理・表示
- **お問い合わせフォーム**: Server Actionsによるフォーム送信処理
- **SEO最適化**: 構造化データ、メタタグ、地域SEO対応
- **GA4統合**: ユーザー行動分析

## 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **アニメーション**: Framer Motion
- **CMS**: Notion API
- **デプロイ**: Vercel
- **分析**: Google Analytics 4

## 環境変数

プロジェクトのルートに`.env.local`ファイルを作成し、以下の環境変数を設定してください。

```bash
# Notion API
NOTION_TOKEN=your_notion_integration_token
NOTION_DATABASE_ID_NEWS=your_news_database_id
NOTION_DATABASE_ID_CATALOG=your_catalog_database_id

# メール送信（オプション）
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASSWORD=your_password

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

`.env.example`ファイルを参照してください。

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

### 3. ビルド

```bash
npm run build
```

### 4. 本番環境での起動

```bash
npm start
```

## プロジェクト構造

```
j-florist-hp/
├── app/                    # Next.js App Router ページ
│   ├── page.tsx           # トップページ
│   ├── news/              # お知らせページ
│   ├── catalog/           # 商品カタログページ
│   ├── contact/           # お問い合わせページ
│   └── ...
├── components/             # 再利用可能なUIコンポーネント
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ...
├── lib/                    # ユーティリティ関数・API連携
│   ├── notion.ts          # Notion API クライアント
│   └── ...
├── types/                  # TypeScript型定義
├── public/                 # 静的ファイル（画像など）
└── CLAUDE.md              # プロジェクト要件定義書
```

## デプロイ

Vercelへのデプロイを推奨します。

1. GitHubにリポジトリをプッシュ
2. Vercelダッシュボードで新規プロジェクトを作成
3. GitHubリポジトリを接続
4. 環境変数を設定
5. デプロイ

## ライセンス

All rights reserved.
