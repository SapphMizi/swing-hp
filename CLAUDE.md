# CLAUDE.md

このファイルは、リポジトリで作業する Claude Code (claude.ai/code) に向けたガイダンスです。

## Git ワークフロー（必須）

**`main` ブランチへの直接 push は禁止。** 必ずブランチを切ってから作業すること。

```bash
git checkout -b ブランチ名   # 作業開始前に必ず実行
# 例: git checkout -b feature/hero-images
#     git checkout -b fix/contact-email
```

作業完了後は GitHub 上でプルリクエストを作成する。`git push origin ブランチ名` で push し、PR を通じて `main` にマージする。

## プロジェクト概要

**大阪大学 軽音楽部 SWING** の公式ウェブサイト。部内には Blue Spirits Jazz Orchestra、Swing Arcade Orchestra、The New Wave Jazz Orchestra の3つのビッグバンドがある。利用者と目的は `PRODUCT.md`、デザインの要件は `docs/requirements.md` が正本。

## 技術スタック

- **TanStack Start** — SSR React フレームワーク（Vite ベース）
- **TanStack Router** — `src/routes/` によるファイルベースルーティング
- **TanStack Query** — microCMS のデータをルートの loader で `ensureQueryData` し、コンポーネントで `useSuspenseQuery` する
- **microCMS** — 記事・トップ写真・バンド紹介・歴史の管理（`microcms-js-sdk`、無料の Hobby プラン）
- **Tailwind CSS v4** — `src/styles.css` の `@theme` カスタムプロパティでスタイリング
- **GSAP** — ローディング画面のタイムラインだけに使う
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
│   ├── __root.tsx            # HTML シェル、フォント、初回判定スクリプト、Cache-Control、404
│   ├── index.tsx             # トップ（ヒーロー、お知らせ、バンド、ライブレポート、入部案内）
│   ├── about.tsx / history.tsx / schedule.tsx / contact.tsx
│   ├── news.index.tsx / news.$id.tsx
│   └── live-reports.index.tsx / live-reports.$id.tsx   # ?year= で年を絞り込む
├── components/
│   ├── layout/               # Header（鍵盤のナビ）、Footer、Page（外枠）
│   ├── loading/              # LoadingScreen
│   ├── home/                 # Hero、NewsList、BandSheets、ReportGrid
│   ├── ui/                   # Keys（鍵盤の帯）、SectionHeading、StickyDate、TapedPhoto、ButtonLink、RichText、SnsLinks
│   ├── ArticlePage.tsx       # お知らせ・ライブレポートの本文
│   └── NotFound.tsx
├── server/cms.ts             # createServerFn で microCMS を読む。生のデータを画面用の型に変換する
├── lib/
│   ├── cms-types.ts          # 画面で使う型
│   ├── queries.ts            # queryOptions
│   ├── bands.ts              # バンドの正式名とテーマカラー
│   ├── defaults.ts           # microCMS が空のときのバンド紹介と年表
│   └── format.ts             # 英語欄のフォールバック、画像 URL、日付
├── i18n/                     # ja.ts / en.ts（固定の文言だけ。記事は microCMS）
└── styles.css                # @theme の色とフォント
public/images/hand/           # アイコンから切り出した手描きの部品（logo、bubble、chara）
docs/requirements.md          # 要件定義書
docs/microcms-schema/         # microCMS にインポートするスキーマ
.claude/skills/swing-ui/      # このサイトの UI の方針（UI を触る前に読む）
```

## デザインシステム

部の SNS アイコン（桃色の紙に色鉛筆の手描き）が基準。色は `src/styles.css` の `@theme` で定義し、Tailwind のクラス（`bg-paper`、`text-ink` など）で使う。決めた理由とコントラスト比は `docs/requirements.md` の 2 章にある。ダークモードは作らない。

| トークン | 値 | 用途 |
|---|---|---|
| `paper` | `#fbdcc0` | ページの背景 |
| `paper-light` | `#fdeee1` | 長い文章の背景、暗い面の上の文字 |
| `ink` | `#2b1d1f` | 文字、濃い帯 |
| `pink-deep` | `#b0304f` | リンク、ボタン |
| `pink` / `teal` / `orange` / `yellow` / `green` | | 面と装飾。面の上の文字は `ink` |
| `blue` / `red` / `navy` | `#3f6f96` / `#ea5a48` / `#23365e` | バンドのテーマカラー（`src/lib/bands.ts`） |

フォントは Zen Maru Gothic（本文と見出し）と Klee One（手書きの注記）。

## 設計上の重要な決定事項

- **ローディング画面** は SSR の HTML に最初から含め、`__root.tsx` の head のスクリプトが初回訪問かつ視差効果を減らす設定がオフのときだけ `html[data-intro]` を付けて表示する。終わると `sessionStorage` に記録する。JavaScript が動かなくても CSS で 4 秒後に外れる。
- **スクロール時の演出** は見出しのマーカー線だけ（`SectionHeading`、IntersectionObserver で1回だけ）。ScrollTrigger は使わない。
- **microCMS** の API キーは `src/server/cms.ts` の中だけで読む。環境変数がない、または API が失敗したときもページは表示する（記事は空、バンドと年表は `defaults.ts`）。管理画面のセレクトの選択肢は日本語・正式名で、`cms.ts` で識別子に変換している。
- **キャッシュ** は `__root.tsx` の `headers` で `s-maxage=60, stale-while-revalidate=600`。公開から1分ほどで反映されるので Webhook は使わない。
- **i18n** は URL を変えないクライアントサイドトグル。英語欄が空なら日本語を出す（`useLocalized`）。
- **手描きの部品** は 400px のアイコンから切り出したもの。高解像度の元データはない。CSS で手描き風の線を作らない。
- **公開アセット** は `public/` に置く。

## 未対応 / TODO

- microCMS のサービスを作り、`docs/microcms-schema/` をインポートして環境変数を設定する（手順は README）
- 各バンドの SNS の URL と部のメールアドレスを microCMS に入力する
- トップとライブレポートの写真を microCMS に入れる
- `src/routes/schedule.tsx` に Google カレンダーを組み込む（カレンダーの一般公開設定が確認できてから）
- ライブレポートへのアメブロ埋め込み（後回し）
- `/for-obog` ルート（後回し）
- Vercel デプロイ設定（`vercel.json`）

## 参考

移行前のオリジナル HTML サンプルは `_reference/` に保存してある。
