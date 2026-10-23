---
name: 大阪大学 軽音楽部 SWING
description: 部の SNS アイコン(桃色の紙に色鉛筆の絵)をそのまま広げた、明るい紙色の公式サイト
colors:
  paper: "#fbdcc0"
  paper-light: "#fdeee1"
  ink: "#2b1d1f"
  pink: "#e0456f"
  pink-deep: "#b0304f"
  blue: "#3f6f96"
  teal: "#7abdc5"
  orange: "#f0904a"
  yellow: "#fbd96e"
  green: "#8fb85a"
  red: "#ea5a48"
  navy: "#23365e"
typography:
  display:
    fontFamily: "Zen Maru Gothic, Hiragino Maru Gothic ProN, sans-serif"
    fontSize: "clamp(2.4rem, 7vw, 4.75rem)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Zen Maru Gothic, Hiragino Maru Gothic ProN, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 900
    lineHeight: 1.05
  title:
    fontFamily: "Zen Maru Gothic, Hiragino Maru Gothic ProN, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.375
  body-lead:
    fontFamily: "Zen Maru Gothic, Hiragino Maru Gothic ProN, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.625
  body:
    fontFamily: "Zen Maru Gothic, Hiragino Maru Gothic ProN, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.8
  label:
    fontFamily: "Zen Maru Gothic, Hiragino Maru Gothic ProN, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.5
  hand:
    fontFamily: "Klee One, Zen Maru Gothic, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.5
rounded:
  sm: "2px"
  xl: "12px"
  2xl: "16px"
  full: "9999px"
spacing:
  gutter: "16px"
  gutter-sm: "24px"
  stack-sm: "12px"
  stack-md: "24px"
  stack-lg: "32px"
  section: "80px"
  section-md: "112px"
  container: "1280px"
components:
  button-primary:
    backgroundColor: "{colors.pink-deep}"
    textColor: "{colors.paper-light}"
    typography: "{typography.title}"
    rounded: "{rounded.full}"
    padding: "8px 8px 8px 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper-light}"
  button-secondary:
    backgroundColor: "{colors.paper-light}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "8px 8px 8px 24px"
    height: "48px"
  button-secondary-hover:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
  pill-link:
    backgroundColor: "{colors.paper-light}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "0 16px"
    height: "44px"
  pill-link-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper-light}"
  news-row:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.2xl}"
    padding: "12px 20px 12px 12px"
    height: "96px"
  sticky-date:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    size: "72px"
  section-ribbon:
    backgroundColor: "{colors.pink-deep}"
    textColor: "{colors.paper-light}"
    typography: "{typography.label}"
    padding: "2px 20px 2px 12px"
  band-sheet-blue-spirits:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.paper-light}"
  band-sheet-swing-arcade:
    backgroundColor: "{colors.red}"
    textColor: "{colors.ink}"
  band-sheet-new-wave:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.paper-light}"
  nav-key:
    backgroundColor: "{colors.paper-light}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    width: "102px"
    height: "74px"
  nav-key-active:
    backgroundColor: "{colors.yellow}"
---

# Design System: 大阪大学 軽音楽部 SWING

## Overview

**Creative North Star: "部のアイコンを広げた画用紙"**

サイト全体を、部の SNS アイコンの桃色の画用紙を大きく広げたものとして扱う。地は紙の色(`paper`)で、文字はすべてアイコンの線と同じ焦げ茶(`ink`)。アイコンの中にある手描きのロゴ、吹き出し、キャラクター、鍵盤を、そのまま切り出して画面の部品にしている。手描きの線を CSS やフィルターで真似ることはせず、手描きに見えるものは必ずアイコンから起こした画像である。

色鉛筆の色(水色、橙、黄緑、黄)は、紙に少しだけ置く差し色ではなく、お知らせの行や付箋、写真のない記事の面として広く塗る。3つのバンドはそれぞれのテーマカラーの面を画面幅いっぱいに持ち、上下をちぎった紙の縁でつなぐ。写真は紙にマスキングテープで留めたように白い余白を付けて少し傾ける。密度は低めで、スマートフォンの 390px 幅で読みやすいことを基準にし、PC ではそれを横に広げる。

黒い背景にアンバーの光を置くジャズクラブ風の見た目と、クリーム色に差し色を1つだけ置いた量産型のランディングページは採らない。ダークモードは作らない。

**Key Characteristics:**
- 地は紙色、文字は焦げ茶の一色。ライトテーマだけ
- 色鉛筆の色を面で塗り、その上の文字は `ink`
- 手描きの部品はアイコンから切り出したラスター画像(`public/images/hand/`)
- 区切りはちぎった紙の縁か鍵盤の帯。直線の罫線で区切らない
- 写真と付箋は少し傾け、紙に貼った物として柔らかい影を落とす
- 押せるものは丸いピル形で、高さ 44px 以上

## Colors

アイコンの紙、線、色鉛筆から抜き出した色だけでできた、暖かい紙色のパレット。値は `src/styles.css` の `@theme` が正本で、Tailwind のクラス(`bg-paper`、`text-ink` など)から使う。

### Primary
- **焦げ茶の線(Ink)** (`ink`): 本文、見出し、枠線、鍵盤の黒鍵、ボタンのホバー時の背景。1ページに1か所だけ、濃い帯(入部案内など)の背景にも使う。
- **濃い桃(Deep Pink)** (`pink-deep`): リンクの文字、主ボタンの背景、見出しに添える日本語のリボン、モバイルメニューの現在地。紙の上で文字として読める唯一の桃色。

### Secondary
- **桃の塗り(Pink)** (`pink`): マスキングテープ(70% の不透明度、乗算)など塗りだけに使う。文字には使わない。
- **ギターの青(Blue)** (`blue`): Blue Spirits Jazz Orchestra の面。上の文字は `paper-light`。紙の上の文字には使わない。
- **N の赤(Red)** (`red`): Swing Arcade Orchestra の面。上の文字は `ink`。
- **鍵盤の紺(Navy)** (`navy`): The New Wave Jazz Orchestra の面。上の文字は `paper-light`。

### Tertiary
- **サックスの水色(Teal)** (`teal`): お知らせの1行目、写真のない記事の面、マスキングテープ(80%、乗算)。
- **G の橙(Orange)** (`orange`): お知らせの2行目の面。
- **傘の黄緑(Green)** (`green`): お知らせの3行目、写真のない記事の面。
- **吹き出しの黄(Yellow)** (`yellow`): 付箋の日付、見出しのマーカー線、ナビの現在地の鍵、副ボタンとピルのホバー、選択範囲、フォーカスリングの外側。

### Neutral
- **画用紙(Paper)** (`paper`): ページ全体の地、ヘッダー、ヒーロー、入部案内の紙片。
- **明るい画用紙(Paper Light)** (`paper-light`): 長い文章の地、写真の白い余白、副ボタン、鍵盤の白鍵、フッター。濃い面の上の文字色でもある。

### Named Rules
**The Crayon Field Rule.** `teal`・`orange`・`green`・`yellow`・`red` は面として広く塗り、その上の文字は必ず `ink` にする。差し色を細い線や小さな点だけに使って済ませない。

**The Fill Not Text Rule.** `pink` と `blue` は紙の上で 4.5:1 に届かないので、文字にもアイコンにも使わない。リンクとボタンの色は `pink-deep` だけ。

**The Band Color Rule.** バンドの面の色と文字色は `src/lib/bands.ts` の対応(`blue`/`paper-light`、`red`/`ink`、`navy`/`paper-light`)から取り、画面ごとに決め直さない。バンドは正式名だけで示し、略称を出さない。

**The One Ink Band Rule.** `ink` を背景にした濃い帯は1ページに1か所まで。

## Typography

**Display Font:** Zen Maru Gothic 900(フォールバック Hiragino Maru Gothic ProN, sans-serif)
**Body Font:** Zen Maru Gothic 500 / 700
**Label/Mono Font:** Klee One 600(手書きの注記だけ)

**Character:** 丸ゴシックの極太で英字の大見出しを組み、アイコンの手描き文字に近い丸さを出す。Klee One は鉛筆で書き足したメモの役で、量を絞って使う。Google Fonts から Zen Maru Gothic 500・700・900 と Klee One 600 だけを読み込む。

### Hierarchy
- **Display** (900, clamp(2.4rem, 7vw, 4.75rem), 0.95): セクションの英字の大見出し(NEWS、OUR BANDS)。大文字、字間 -0.01em。下に黄色のマーカー線が引かれる。
- **Headline** (900, clamp(2rem, 5vw, 3.5rem), 1.05): バンド名。`text-wrap: balance` で2行に整える。
- **Title** (700, 1rem〜1.125rem, 1.375): お知らせの行とライブレポートの題名、ボタンの文字。
- **Body Lead** (500, 1.125rem, 1.625): ヒーローの紹介文、バンド紹介、入部案内の文章。幅は 22em〜46ch。
- **Body** (500, 1rem, 1.8): 本文。記事本文は 68ch まで。
- **Label** (700, 0.875rem): 見出しの日本語リボン、言語切り替え、補足。12px より小さくしない。
- **Hand** (Klee One 600, 1rem〜1.5rem): ライブレポートの日付、写真のない記事の題名、フッターのタグライン、紙片の注記。

### Named Rules
**The English Head, Japanese Ribbon Rule.** セクションの見出しは英字の大見出しの下に、`pink-deep` のリボン形ラベルで日本語を添える。英語表示のときはリボンを出さない。リボンを見出しの上に置いたり、英字の小見出しを別に作ったりしない。

**The Pencil Note Rule.** Klee One は日付と短い注記だけに使い、段落や見出しには使わない。

## Layout

モバイルファーストで、390px 幅を基準に1列で組む。左右の余白は 16px(640px 以上で 24px)、内容の最大幅は 1280px(本文だけのページは 896px)。セクションの上下は 80px、768px 以上で 112px。見出しの下は 40px(768px 以上で 56px)空ける。

1024px 以上で横に広げる。ヒーローは 12 列のうち 5 列にロゴ・紹介文・ボタン、7 列に写真を置き、モバイルではロゴ、紹介文、ボタン、写真の順に縦に並ぶ。お知らせは見出しと一覧を 1:2 に分ける。バンドの面は写真と文章を2列にし、行ごとに左右を入れ替える。ライブレポートは 3 列で、中央の列だけ 40px 下げて段違いにする。

ヘッダーは画面上部に固定する(`sticky`)。押せる要素はすべて高さ 44px 以上。375px 幅でも横スクロールを出さない。日本語は文節で折り返す(`word-break: auto-phrase`)。

**The Torn Edge or Keys Rule.** セクションの境目は、ちぎった紙の縁(`TornEdge`、下の面の色で塗り上に 31px 食い込ませる)か、鍵盤の帯(`Keys`、高さ 34〜40px)で区切る。罫線やグラデーションの線で区切らない。

## Elevation & Depth

基本は平らな紙で、面の重なりは色の違いとちぎった縁で表す。影を持つのは、紙の上に貼られた物(テープで留めた写真、付箋、入部案内の紙片)だけで、どれも下方向に落ちるぼかした影に負の広がりを付け、色は `ink` を透かしたもの。影のある物はたいてい 1〜4 度傾けて置く。

### Shadow Vocabulary
- **付箋(sticky)** (`box-shadow: 0 6px 10px -5px rgba(43,29,31,0.45)`): 日付の付箋。
- **貼った写真(photo)** (`box-shadow: 0 10px 18px -10px rgba(43,29,31,0.5)`): バンドとライブレポートの写真、スケジュールの黄色い紙片。
- **ヒーローの写真(photo-hero)** (`box-shadow: 0 14px 24px -14px rgba(43,29,31,0.55)`): ヒーローの大きな写真だけ。
- **濃い帯の上の紙片(on-ink)** (`box-shadow: 0 18px 30px -16px rgba(0,0,0,0.6)`): `ink` の帯に置いた紙片。
- **鍵の厚み(key-travel)** (`box-shadow: 0 3px 0 0 var(--color-ink)`): ヘッダーの鍵盤ナビだけ。ホバーとフォーカスで鍵が 3px 沈み、影が消える。

### Named Rules
**The Pinned Paper Rule.** 影は紙に貼った物にだけ付ける。ボタン、行、カードの枠には影を付けず、`ink` の 2px の線で輪郭を取る。

**The Key Travel Only Rule.** ずらした硬い影は、鍵盤の鍵が押し下がる表現にだけ使う。ボタンやカードに転用しない。

## Shapes

輪郭は `ink` の 2px の線が基本。押せる物は完全な丸のピル形(9999px)で、主ボタンは右端に矢印を入れた円(32px)を持つ。面を持つ行や枠は 16px の角丸。鍵盤の鍵は下側だけ 12px の角丸。写真は角を丸めず、6〜10px の白い余白(`paper-light`)を付ける。見出しのリボンは右端を V 字に切り欠く。ちぎった縁は `public/images/hand/torn-edge.png` のマスクで切り抜く。空の状態は 2px の破線の枠で示す。

## Components

### Buttons
丸くて押しやすく、右端の円の矢印で先に進むことを示す。
- **Shape:** ピル形(9999px)、2px の枠線、高さ 48px、左 24px・右 8px の余白。右端に直径 32px の円と矢印(lucide `ArrowRight`, 18px)。
- **Primary:** `pink-deep` の地に `paper-light` の文字。円は `paper-light` の地に `pink-deep` の矢印。
- **Hover / Focus:** 地と枠が `ink` に変わり(150ms)、円が 2px 右へ動く。フォーカスは全体共通の `ink` 3px の輪と `yellow` の外輪。
- **Secondary:** `paper-light` の地に `ink` の枠と文字、円は `ink`。ホバーで地が `yellow`。濃い帯の上でもこの形を使う。

### Chips
- **Style:** SNS リンク、言語切り替え、モバイルのフッターリンクは、`paper-light` の地に `ink` の 2px 枠のピル(高さ 44px 以上)。
- **State:** SNS リンクはホバーで `ink` の地に反転、言語切り替えとフッターリンクはホバーで `yellow`。ライブレポートの年度タブは選択中を `ink` の地に `paper-light` の文字で示す。

### Cards / Containers
- **Corner Style:** お知らせの行と問い合わせの枠は 16px。写真は角丸なし。
- **Background:** 色鉛筆の色の面(行ごとに `teal`→`orange`→`green` の順)か、`paper-light`。
- **Shadow Strategy:** 枠には影を付けない(Elevation の The Pinned Paper Rule)。
- **Border:** `ink` の 2px。
- **Internal Padding:** 12〜24px。

### Navigation
- **PC(1024px 以上):** ヘッダー右側に、鍵盤の白鍵の形をしたリンクを 6 本並べる(幅 102px・高さ 74px、下側だけ角丸、枠 2px)。英語の名前(900)の下に日本語を添え、英語表示では英語だけ。黒鍵(`ink`)が鍵の間に乗る。ホバーとフォーカスで鍵が沈み、現在地は `yellow`。
- **モバイル:** 44px の丸いメニューボタンで開く一覧。各行は高さ 56px、英語(1.25rem, 900)と日本語(0.875rem)を横に並べ、現在地は `pink-deep`。
- **ヘッダー:** 画面上部に固定、`paper` の地、下端に `ink` の 2px の線。左にキャラクターと「SWING」、その下に部名。

### Section Heading
英字の大見出し(Display)と、その下の `pink-deep` のリボン。見出しが画面に入ると、`marker.webp` の黄色いマーカー線が左から 300ms で1回だけ引かれる。逆再生しない。

### Sticky Date
72px 四方の `yellow` の付箋に、年(12px)と月日(1.25rem, 900、等幅数字)。行ごとに -4、3、-2 度傾け、お知らせの行の左上にはみ出して貼る。お知らせの日付は必ずこの形にする。

### Taped Photo
`paper-light` の余白付きの写真に、`pink` と `teal` の半透明のマスキングテープを2枚、上端に斜めに貼る。-2〜2 度傾ける。ヒーローではキャラクターが写真の左下からのぞく。写真が複数あるときはクロスフェードで切り替え、拡大などの動きは付けない。

### Band Sheet
バンドごとに画面幅いっぱいの面を持ち、上端をちぎった縁にする。バンド名(Headline)、紹介文(Body Lead)、SNS のピル、テープで留めた写真。写真がないときはバンド名と紹介文を左右に分ける。

### Keys
アイコンの鍵盤を横に繰り返す SVG の帯(白鍵 22px、黒鍵は高さの 60%)。ヒーローの下端、フッターの上端、ローディング画面で使う。

### Loading Screen
ブラウザのセッションで最初の1回だけ、`paper` の全面に、ロゴが左から描かれ、キャラクターが鍵盤の上を跳ねながら歩く(約 1.4 秒)。クリックかキー入力で飛ばせる。`prefers-reduced-motion: reduce` では出さない。

## Do's and Don'ts

### Do:
- **Do** 地は `paper` か `paper-light`、文字は `ink` にする。
- **Do** 色鉛筆の色(`teal`・`orange`・`green`・`yellow`)は面で塗り、上の文字は `ink` にする。
- **Do** リンクとボタンは `pink-deep` にする。
- **Do** バンドの色は `src/lib/bands.ts` から取り、バンドは正式名だけで書く。
- **Do** セクションの境目は `TornEdge` か `Keys` にする。
- **Do** 手描きの部品は `public/images/hand/` の画像を使い、ロゴは幅 480px(写真がないときは 520px)までで表示する。
- **Do** 写真と付箋は少し傾け、紙に貼った物の影を付ける。
- **Do** 押せる要素は高さ 44px 以上、文字は 12px 以上にする。
- **Do** 動きは状態の変化とマーカー線程度にとどめ、150〜300ms で1回だけ再生し、`prefers-reduced-motion: reduce` では止める。

### Don't:
- **Don't** 黒や濃紺をページの地にしない。ダークモードを作らない。
- **Don't** `pink` と `blue` を紙の上の文字に使わない。
- **Don't** ぼかした光の円、ノイズ、装飾のグラデーション、`backdrop-blur` のヘッダーを使わない。
- **Don't** CSS や SVG フィルターで手描き風の線を作らない。
- **Don't** 罫線やグラデーションの線でセクションを区切らない。
- **Don't** 同じ大きさの角丸カードを並べるだけのレイアウトや、カードの背景に大きく薄い番号を置く装飾を使わない。
- **Don't** `font-mono` と広い字間の英字の小見出しや、見出しの上に置く小見出しを作らない。
- **Don't** 浮遊するパーティクル、Ken Burns、逆再生されるスクロール演出を使わない。
- **Don't** 絵文字をアイコンの代わりに使わない。
- **Don't** ずらした硬い影を鍵盤のナビ以外に使わない。
