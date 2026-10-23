# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

大阪大学 軽音楽部 SWING の公式サイトを訪れる人。優先する順に次の4者。

1. 入部を考えている新入生。新歓期に部の SNS からスマートフォンで来て、部の雰囲気、3つのバンドの違い、見学や入部の方法を知りたい
2. ライブに来る人(部員の家族や友人、学内外のジャズ好き)。次の演奏会の日時と場所、過去のライブの様子を知りたい
3. OB・OG。部の近況と歴史を見たい
4. 演奏を依頼したい人(学内外のイベント主催者)。どのバンドに頼むかを決め、連絡先を知りたい

サイトを更新するのは代々の広報担当の部員で、プログラミングの経験は前提にしない。記事の投稿とトップ画像の差し替えは microCMS の管理画面で行い、コードには触らない。

## Product Purpose

部の活動を外に伝え、新入生の入部と演奏会への来場につなげる。新歓期に SNS から来た新入生が、見学の方法と連絡先までたどり着けることを第一の成功とする。

## Positioning

1962年創部。豊中キャンパスの明道館を拠点に、Blue Spirits Jazz Orchestra、Swing Arcade Orchestra、The New Wave Jazz Orchestra の3つのビッグバンドが活動している。Blue Spirits Jazz Orchestra は入部した部員が加入するバンド、Swing Arcade Orchestra はファンクやフュージョンを中心にオールジャンルを演奏するバンド、The New Wave Jazz Orchestra はカウント・ベイシーの楽曲だけを演奏するバンド。

## Operating Context

- 新歓期(4月ごろ)のアクセスはスマートフォンからが中心
- 連絡は各バンドの SNS の DM かメールで受ける。依頼演奏のメールには依頼するバンド名を書いてもらう
- 演奏会の予定は Google カレンダーで管理している(サイトへの組み込みは、カレンダーの一般公開設定を確認してから)
- 移行前のサイトは `_reference/` の静的 HTML

## Capabilities and Constraints

- TanStack Start(SSR)、Tailwind CSS v4、Vercel にデプロイ
- 記事(お知らせ、ライブレポート)、トップ画像とサイト設定、バンド紹介、歴史は microCMS で管理する。無料の Hobby プランを使うので、API は5個、メンバーは3人、API キーは1個まで
- 日本語と英語を URL を変えずに切り替える。英語はナビゲーションや紹介文などの固定文言だけ用意し、記事は日本語だけでよい。記事の英語欄は任意で、空なら日本語を表示する
- ダークモードは作らない
- 未定: Google カレンダーの組み込み方法、OB・OG 向けページ(`/for-obog`)の内容、ライブレポートへのアメブロの埋め込み

## Brand Commitments

- 部の SNS アイコン(`public/images/swing_logo.jpg`)は、桃色の紙に色鉛筆で描いた「SWING」のロゴで、楽器を持った人物、鍵盤、「ALL YOU NEED is JAZZ」の吹き出しが入っている。サイトの配色はこのアイコンの色を主体にする(ユーザーの指定)
- キャラクター画像 `public/images/swing_chara.png` がある
- 各バンドにテーマカラーがある。Blue Spirits Jazz Orchestra は青と白、Swing Arcade Orchestra は赤と黒、The New Wave Jazz Orchestra は紺と白
- タグラインは「All you need is Jazz」
- 文言は no-ai-smell(`~/.claude/skills/no-ai-smell/references/writing-ja.md`)に従う。誇張した宣伝文句、感嘆符、絵文字を使わない

## Evidence on Hand

- ロゴ画像は 400px 四方の JPEG しかない。高解像度の元データは部に依頼する
- ライブ写真はリポジトリにまだない。トップ画像とライブレポートの写真は、microCMS に広報担当がアップロードする
- 各バンドの SNS の URL と部のメールアドレスは未確認(`src/routes/contact.tsx` はプレースホルダー)
- 部員の声、実績の数値、受賞歴などは手元にない。サイトに書くときは部に確認し、作らない

## Product Principles

1. 新入生がスマートフォンで、見学と連絡の方法に迷わずたどり着けることを最優先にする
2. 広報担当が変わっても更新が止まらないように、更新の作業は microCMS の管理画面だけで完結させる
3. 部の手描きのアイコンが持つ雰囲気を、サイト全体の基準にする
4. 書けない事実は書かない。予定や連絡先が未確定なら、未確定と分かる表示にする

## Accessibility & Inclusion

本文の文字のコントラスト比は WCAG AA(4.5:1)以上。`prefers-reduced-motion` を尊重し、ローディング画面とアニメーションを止める。
