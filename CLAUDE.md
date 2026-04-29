# CLAUDE.md

このファイルは、リポジトリで作業する Claude Code (claude.ai/code) に向けたガイダンスです。

## プロジェクト概要

**大阪大学 軽音楽部 SWING** の公式ウェブサイト。部内には D軍、Swing Arcade Orchestra (SAO)、The New Wave Jazz Orchestra (TNWJO) の3つのビッグバンドがある。

## 技術スタック

- **TanStack Start** — SSR React フレームワーク（Vite ベース）
- **TanStack Router** — `src/routes/` によるファイルベースルーティング
- **TanStack Query** — サーバーステートのデータ取得（Google Calendar API 等、将来対応）
- **Tailwind CSS v4** — `src/styles.css` の `@theme` カスタムプロパティでスタイリング
- **GSAP + ScrollTrigger** — アニメーション（ローディング画面、Ken Burns、スクロールリビール）
- **i18next + react-i18next** — 日本語/英語切り替え（URL 変更なし、ヘッダーのトグルボタン）
- **TypeScript**
- **Vercel** — デプロイ先

## コマンド

```bash
npm run dev        # 開発サーバー起動（http://localhost:3000）
npm run build      # プロダクションビルド
npm run preview    # プロダクションビルドをローカルでプレビュー
npx tsc --noEmit   # 型チェックのみ
npm run lint       # ESLint
npm run format     # Prettier + ESLint 自動修正
```

## ディレクトリ構成

```
src/
├── routes/
│   ├── __root.tsx          # HTML シェル + レイアウト（Header・Footer・LoadingScreen）
│   ├── index.tsx           # ホームページ（Hero + 各セクション）
│   ├── about.tsx
│   ├── history.tsx         # タイムラインコンポーネント
│   ├── schedule.tsx        # Google カレンダー（API 準備中はプレースホルダー）
│   ├── live-reports.tsx    # 年別タブ + カードグリッド
│   └── contact.tsx         # 各バンドの SNS リンク
├── components/
│   ├── layout/             # Header、Footer
│   ├── loading/            # LoadingScreen（GSAP タイムライン、セッション制御）
│   ├── home/               # Hero（Ken Burns + パーティクル）、BandCard、MusicNoteParticles
│   └── ui/                 # SectionTitle（ScrollTrigger リビール）
├── i18n/
│   ├── index.ts            # i18next 初期化（デフォルト言語: ja）
│   ├── ja.ts               # 日本語翻訳
│   └── en.ts               # 英語翻訳
├── integrations/tanstack-query/
│   ├── root-provider.tsx   # QueryClient セットアップ
│   └── devtools.tsx
├── router.tsx              # ルーターファクトリ
└── styles.css              # Tailwind v4 + @theme カラートークン
```

## デザインシステム

カラーは `src/styles.css` の `@theme` トークンで定義し、Tailwind クラス（`bg-swing-amber`、`text-swing-cream` 等）として参照する。

| トークン | 値 | 用途 |
|---|---|---|
| `swing-black` | `#0c0805` | ページ背景 |
| `swing-deep` | `#1a1208` | カード背景 |
| `swing-amber` | `#f2bf80` | メインアクセント（ロゴ由来） |
| `swing-amber-light` | `#f7d9aa` | ホバー状態 |
| `swing-coral` | `#d45a30` | サブアクセント |
| `swing-cream` | `#f5ecd7` | メインテキスト |
| `swing-warm-gray` | `#8c7b6a` | ミュートテキスト |
| `swing-warm-gray-light` | `#b5a898` | サブテキスト |

## 設計上の重要な決定事項

- **ローディング画面** は `sessionStorage` でセッション制御しており、ブラウザセッション中の初回ページ読み込み時のみ表示される（SPA ナビゲーション時は非表示）。クライアント専用（`useEffect` 内で初期化）のため、SSR ハイドレーション不一致を回避している。
- **i18n** は URL を変えないクライアントサイドトグル。`i18n.language` はルーターコンテキスト経由ではなく各コンポーネントで直接参照する。翻訳は `src/i18n/ja.ts` と `en.ts` に集約。
- **GSAP ScrollTrigger** は使用するファイルごとに `gsap.registerPlugin(ScrollTrigger)` を呼ぶこと。
- **ヒーロー画像** は `/images/hero-1.jpg`、`hero-2.jpg`、`hero-3.jpg` から読み込む。画像がない場合はフォールバックグラデーションが表示される。
- **公開アセット** は `public/` に配置する。ロゴは `public/images/swing_logo.jpg`。

## 未対応 / TODO

- `src/routes/contact.tsx` のプレースホルダー SNS URL を実際の URL に変更（`https://www.instagram.com/` と `https://x.com/` を検索）
- `src/routes/contact.tsx` の `SWING_EMAIL` 定数を実際のメールアドレスに変更
- `public/images/` にヒーロー画像を追加（`hero-1.jpg`、`hero-2.jpg`、`hero-3.jpg`）
- `src/routes/schedule.tsx` に Google Calendar API を組み込む（カレンダーの一般公開設定が確認できてから）
- ライブレポートへのアメブロ埋め込み（後回し）
- `/for-obog` ルート（後回し）
- Vercel デプロイ設定（`vercel.json`）

## 参考

移行前のオリジナル HTML サンプルは `_reference/` に保存してある。
