# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

Viteをビルドツールとして使用したバニラJavaScript製の電卓アプリケーション。フレームワーク依存なしのシンプルなシングルページアプリケーションです。

## 開発コマンド

- `npm run dev` - Vite開発サーバーを起動（HMR有効）
- `npm run build` - 本番環境用にビルド（`dist/`ディレクトリに出力）
- `npm run preview` - 本番ビルドをローカルでプレビュー

## プロジェクト構造

- `index.html` - エントリーポイントのHTMLファイル（Viteのルート）
- `main.js` - メインのJavaScriptエントリーポイント（Calculatorクラスとイベントリスナーを含む）
- `style.css` - グローバルスタイル（電卓のUIスタイルを含む）
- `dist/` - 本番ビルド出力（.gitignore済み）

## アーキテクチャ

### 電卓の実装構造

- `Calculator`クラス（main.js:4-125）がコア機能を提供
  - 状態管理: `currentOperand`, `previousOperand`, `operation`, `shouldResetScreen`
  - 主要メソッド:
    - `clear()` - 電卓をリセット
    - `appendNumber(number)` - 数字を追加
    - `chooseOperation(operation)` - 演算子を選択
    - `compute()` - 計算を実行（ゼロ除算エラーハンドリング付き）
    - `updateDisplay()` - 表示を更新
    - `getDisplayNumber(number)` - 数値を日本語ロケールでフォーマット

### イベント処理

- DOM要素の`data-*`属性を使用したイベント委譲パターン
- キーボードサポート（数字、演算子、Enter、Backspace、Escape）
- すべてのボタンクリックとキー入力は`calculator.updateDisplay()`を呼び出す

### スタイリング

- CSSグリッドレイアウトでボタンを配置
- ダークモード対応（`prefers-color-scheme: dark`）
- レスポンシブデザイン（400px以下でブレークポイント）

## 開発ルール

### 基本設定

- 常に日本語で返答してください
- エラーメッセージも日本語で説明してください

### コーディング規約

- テスト駆動開発（TDD）の手法で開発してください
- コミットメッセージはconventional commits形式で書いてください
- 関数は単一責任の原則に従って小さく保ってください

### 技術的な制約

- TypeScriptを使用する際はstrictモードを有効にしてください
- CSSはTailwind CSSを優先的に使用してください（注: 現在のプロジェクトはバニラCSSを使用）

## ビルドと実行

- 開発サーバーはデフォルトで`http://localhost:5173`で起動
- Viteが自動的にブラウザを開き、すべてのファイル変更に対してインスタントHMRを提供
- 本番ビルドでは、Viteが適切なコード分割と最小化を行い、すべてのアセットを`dist/`ディレクトリに最適化して出力
