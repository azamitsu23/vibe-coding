# デザイン仕様書

このドキュメントは、プロジェクト全体で厳守すべきデザイン・UI/UX仕様を定義します。

## 1. 技術スタック

### 必須技術
- **Tailwind CSS** - ユーティリティファーストのCSSフレームワーク
- **shadcn/ui** - アクセシブルで再利用可能なコンポーネントライブラリ
- **CSS Variables** - テーマとデザイントークンの管理

### 依存パッケージ
- `tailwindcss` - コアフレームワーク
- `class-variance-authority` - バリアントベースのスタイル管理
- `clsx` - 条件付きクラス名の構築
- `tailwind-merge` - Tailwindクラスの競合解決

## 2. デザイントークン（Design Tokens）

すべてのデザイン値はCSS変数として`src/index.css`の`:root`で一元管理します。

### 2.1 カラーシステム

#### セマンティックカラー
カラーはHSL形式のCSS変数として定義し、用途別に命名します：

```css
--background: 0 0% 100%;           /* ページ背景 */
--foreground: 222.2 84% 4.9%;      /* テキスト */
--primary: 222.2 47.4% 11.2%;      /* 主要アクション */
--primary-foreground: 210 40% 98%; /* プライマリ上のテキスト */
--secondary: 210 40% 96.1%;        /* 補助的な要素 */
--muted: 210 40% 96.1%;            /* 控えめな背景 */
--accent: 210 40% 96.1%;           /* アクセント */
--destructive: 0 84.2% 60.2%;      /* 破壊的アクション（削除等） */
--border: 214.3 31.8% 91.4%;       /* ボーダー */
--input: 214.3 31.8% 91.4%;        /* 入力フィールドのボーダー */
--ring: 222.2 84% 4.9%;            /* フォーカスリング */
```

#### 使用方法
Tailwindのユーティリティクラスで使用：
```tsx
<div className="bg-background text-foreground">
<button className="bg-primary text-primary-foreground">
<div className="border-border">
```

#### ダークモード
`.dark`クラスで自動的に切り替わります：
```tsx
<html className="dark">
```

### 2.2 スペーシング（Spacing）

#### 基本原則
- Tailwindのデフォルトスペーシングスケール（4pxベース）を使用
- `4`, `8`, `12`, `16`, `20`, `24`, `32`, `40`, `48`, `64`の倍数を優先

#### 標準スペーシング値

| サイズ | Tailwindクラス | 実際の値 | 用途 |
|--------|---------------|---------|------|
| xs | `p-1`, `m-1` | 4px | 最小限の余白 |
| sm | `p-2`, `m-2` | 8px | 密接な要素間 |
| md | `p-4`, `m-4` | 16px | 標準的な余白 |
| lg | `p-6`, `m-6` | 24px | セクション内の余白 |
| xl | `p-8`, `m-8` | 32px | セクション間の余白 |
| 2xl | `p-12`, `m-12` | 48px | 大きなセクション間 |

#### コンポーネント別スペーシング標準

**ボタン:**
```tsx
// 標準ボタン
<Button className="px-4 py-2">

// 大きいボタン
<Button className="px-6 py-3">

// 小さいボタン
<Button className="px-3 py-1.5">
```

**カード:**
```tsx
// カード内部のパディング
<Card className="p-6">

// カード間のマージン
<div className="space-y-4">
```

**フォーム:**
```tsx
// フォームフィールド間
<form className="space-y-4">

// ラベルとインプット間
<div className="space-y-2">
```

### 2.3 タイポグラフィ

#### フォントサイズスケール

| サイズ名 | Tailwindクラス | 実際の値 | 行間 | 用途 |
|---------|---------------|---------|------|------|
| xs | `text-xs` | 12px | 16px | キャプション、ヘルプテキスト |
| sm | `text-sm` | 14px | 20px | 小さめのテキスト |
| base | `text-base` | 16px | 24px | 本文（デフォルト） |
| lg | `text-lg` | 18px | 28px | 強調テキスト |
| xl | `text-xl` | 20px | 28px | 小見出し |
| 2xl | `text-2xl` | 24px | 32px | セクション見出し |
| 3xl | `text-3xl` | 30px | 36px | ページタイトル |
| 4xl | `text-4xl` | 36px | 40px | 大見出し |

#### フォントウェイト

```tsx
<p className="font-normal">    // 400 - 本文
<p className="font-medium">    // 500 - 強調
<p className="font-semibold">  // 600 - 小見出し
<p className="font-bold">      // 700 - 見出し
```

#### 見出しの標準スタイル

```tsx
// H1 - ページタイトル
<h1 className="text-3xl font-bold tracking-tight">

// H2 - セクション見出し
<h2 className="text-2xl font-semibold tracking-tight">

// H3 - サブセクション
<h3 className="text-xl font-semibold">

// H4 - 小見出し
<h4 className="text-lg font-medium">
```

### 2.4 ボーダー半径（Border Radius）

#### 標準値
```css
--radius: 0.5rem; /* 8px - ベース値 */
```

#### 使用方法
```tsx
<div className="rounded-lg">    // var(--radius) = 8px
<div className="rounded-md">    // var(--radius) - 2px = 6px
<div className="rounded-sm">    // var(--radius) - 4px = 4px
<div className="rounded-full">  // 完全な円形
```

#### コンポーネント別の推奨値

| コンポーネント | クラス | 説明 |
|--------------|--------|------|
| カード | `rounded-lg` | 標準的な角丸 |
| ボタン | `rounded-md` | 中程度の角丸 |
| インプット | `rounded-md` | 中程度の角丸 |
| バッジ | `rounded-full` | 完全な円形 |
| アバター | `rounded-full` | 完全な円形 |
| ダイアログ | `rounded-lg` | 標準的な角丸 |

### 2.5 シャドウ（Shadows）

#### 標準シャドウスケール

```tsx
<div className="shadow-sm">     // 控えめな影
<div className="shadow">        // 標準的な影
<div className="shadow-md">     // 中程度の影
<div className="shadow-lg">     // 大きめの影
<div className="shadow-xl">     // 非常に大きな影
```

#### 使用ガイドライン
- **shadow-sm**: ボタン、インプットフィールド
- **shadow-md**: カード、ドロップダウン
- **shadow-lg**: モーダル、ポップオーバー
- **shadow-xl**: ドラッグ中の要素

## 3. コンポーネント設計原則

### 3.1 shadcn/uiコンポーネントの使用

#### インストール方法
```bash
# 個別にコンポーネントを追加
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
```

#### 基本原則
1. **コピー&ペースト方式**: コンポーネントはプロジェクト内にコピーされ、完全にカスタマイズ可能
2. **src/components/ui/**: すべてのshadcn/uiコンポーネントはこのディレクトリに配置
3. **拡張時のルール**: 元のコンポーネントを直接編集せず、ラッパーコンポーネントを作成

#### カスタマイズ例
```tsx
// ❌ 直接編集しない
// src/components/ui/button.tsx を直接変更

// ✅ ラッパーコンポーネントを作成
// src/components/custom-button.tsx
import { Button } from "@/components/ui/button"

export function CustomButton({ children, ...props }) {
  return (
    <Button className="custom-class" {...props}>
      {children}
    </Button>
  )
}
```

### 3.2 クラス名の結合

#### cn()ユーティリティの使用
すべてのコンポーネントで`cn()`を使用してクラス名を結合：

```tsx
import { cn } from "@/lib/utils"

// 基本的な使用
<div className={cn("base-class", "additional-class")}>

// 条件付きクラス
<div className={cn(
  "base-class",
  isActive && "active-class",
  isDisabled && "disabled-class"
)}>

// propsからのクラス名マージ
function Component({ className, ...props }) {
  return (
    <div className={cn("default-classes", className)} {...props}>
  )
}
```

### 3.3 バリアントの管理

#### class-variance-authorityの使用
```tsx
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  // ベースクラス
  "inline-flex items-center justify-center rounded-md font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-sm",
        lg: "h-11 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// 使用例
<Button variant="outline" size="lg">クリック</Button>
```

## 4. レスポンシブデザイン

### 4.1 ブレークポイント

Tailwindのデフォルトブレークポイントを使用（モバイルファースト）：

| ブレークポイント | 最小幅 | 対象デバイス |
|----------------|--------|-------------|
| `sm` | 640px | スマートフォン（横） |
| `md` | 768px | タブレット |
| `lg` | 1024px | デスクトップ（小） |
| `xl` | 1280px | デスクトップ（大） |
| `2xl` | 1536px | ワイドモニター |

### 4.2 レスポンシブパターン

```tsx
// モバイルファースト
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// レスポンシブスペーシング
<div className="p-4 md:p-6 lg:p-8">

// レスポンシブタイポグラフィ
<h1 className="text-2xl md:text-3xl lg:text-4xl">

// レスポンシブ表示/非表示
<div className="hidden md:block">   // モバイルで非表示
<div className="md:hidden">         // タブレット以上で非表示
```

## 5. アクセシビリティ（a11y）

### 5.1 必須要件

1. **フォーカス管理**
```tsx
// フォーカスリングを必ず表示
<button className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
```

2. **カラーコントラスト**
- WCAG AA基準を満たす（コントラスト比 4.5:1 以上）
- デザイントークンの色は基準を満たすように設定済み

3. **キーボードナビゲーション**
- すべてのインタラクティブ要素はキーボードでアクセス可能
- タブ順序は論理的に

4. **ARIAラベル**
```tsx
<button aria-label="閉じる">
  <X className="h-4 w-4" />
</button>
```

## 6. パフォーマンス最適化

### 6.1 Tailwind CSS最適化

#### 本番ビルド
- 未使用のCSSは自動的にパージされる
- `content`設定を正確に保つ（tailwind.config.js）

```js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
}
```

### 6.2 コンポーネント最適化

#### 動的インポート
大きなコンポーネントは遅延ロード：

```tsx
import { lazy, Suspense } from 'react'

const HeavyComponent = lazy(() => import('./HeavyComponent'))

function App() {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <HeavyComponent />
    </Suspense>
  )
}
```

## 7. ダークモード

### 7.1 実装方法

```tsx
// ルート要素にクラスを追加
<html className="dark">

// ダークモード対応のスタイル
<div className="bg-background text-foreground">
```

### 7.2 テーマ切り替え実装例

```tsx
function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [theme])

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      テーマ切り替え
    </button>
  )
}
```

## 8. ベストプラクティス

### 8.1 DRY原則（Don't Repeat Yourself）

#### @applyの使用（控えめに）
繰り返しの多いパターンのみ：

```css
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90;
  }
}
```

**注意**: 過度な`@apply`使用は避け、可能な限りユーティリティクラスを直接使用

### 8.2 命名規則

#### ファイル名
- コンポーネント: `PascalCase.tsx` (例: `UserCard.tsx`)
- ユーティリティ: `kebab-case.ts` (例: `format-date.ts`)
- shadcn/uiコンポーネント: `kebab-case.tsx` (例: `button.tsx`)

#### クラス名
```tsx
// ✅ 推奨
<div className="flex items-center gap-4">

// ❌ 避ける
<div className="flexItemsCenterGap4">
```

### 8.3 コンポーネント構造

```tsx
// 推奨される構造
import { cn } from "@/lib/utils"
import { type ComponentProps } from "react"

interface MyComponentProps extends ComponentProps<"div"> {
  variant?: "default" | "outline"
}

export function MyComponent({
  variant = "default",
  className,
  children,
  ...props
}: MyComponentProps) {
  return (
    <div
      className={cn(
        "base-classes",
        variant === "outline" && "outline-classes",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
```

### 8.4 状態管理とスタイル

```tsx
// 状態に応じたスタイル
const [isActive, setIsActive] = useState(false)

<button
  className={cn(
    "px-4 py-2 rounded",
    isActive ? "bg-primary text-primary-foreground" : "bg-secondary"
  )}
>
```

## 9. 開発ワークフロー

### 9.1 新しいコンポーネントを作成する場合

1. **shadcn/uiにコンポーネントが存在するか確認**
   ```bash
   npx shadcn@latest add [component-name]
   ```

2. **存在しない場合は新規作成**
   - `src/components/`に配置
   - デザイントークンとTailwindユーティリティを使用
   - `cn()`でクラス名を結合

3. **バリアントが必要な場合**
   - `class-variance-authority`を使用
   - 型安全性を確保

### 9.2 スタイルのデバッグ

```tsx
// 開発時のヒント: classNameを確認
<div className={cn(
  "base-classes",
  condition && "conditional-class",
  className  // 最後に配置してオーバーライドを許可
)}>
```

### 9.3 Lintとフォーマット

```bash
# Tailwindクラスの順序を自動整形（推奨プラグイン）
npm install -D prettier-plugin-tailwindcss
```

## 10. 禁止事項

### ❌ してはいけないこと

1. **インラインスタイルの使用**
```tsx
// ❌ 避ける
<div style={{ padding: '16px', margin: '8px' }}>

// ✅ 正しい
<div className="p-4 m-2">
```

2. **カスタムCSS値の直接指定**
```tsx
// ❌ 避ける
<div className="p-[13px]">  // 任意の値

// ✅ 正しい
<div className="p-4">  // デザイントークンに沿った値
```

3. **デザイントークン外の色の使用**
```tsx
// ❌ 避ける
<div className="bg-blue-500">

// ✅ 正しい
<div className="bg-primary">
```

4. **shadcn/uiコンポーネントの直接編集**
```tsx
// ❌ 避ける
// src/components/ui/button.tsx を直接編集

// ✅ 正しい
// ラッパーコンポーネントを作成
```

## 11. リソース

### 公式ドキュメント
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [class-variance-authority](https://cva.style/docs)

### ツール
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - VSCode拡張
- [Headless UI](https://headlessui.com) - アクセシブルなコンポーネント
- [Radix UI](https://www.radix-ui.com) - shadcn/uiのベース

---

**最終更新**: 2025-10-28
**バージョン**: 1.0.0

このドキュメントはプロジェクトの進化に合わせて更新されます。
変更がある場合は、チーム全体に通知してください。
