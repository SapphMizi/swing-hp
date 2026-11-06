import type { Award, Band, HistoryEntry, HistoryKind } from './cms-types'

// microCMS が未設定、または空のときに表示する内容。
// 部から受け取った内容(旧サイトの原稿)で、microCMS に入力されたらそちらが優先される。

const STORY_NW = `
<h3>Swing Academy Orchestra 時代</h3>
<p>バンド創設のキッカケは、早稲田大学と慶應義塾大学のビッグバンドの関西公演を聴きに行ったこと。その時「なんというサウンドのうねり、なんというダイナミックなリズム、、、鳥肌が立ち、うーん、、、これをやってみたい！」と、学内にメンバーを募ったのが1963年。（註：当時ハイソのドラマーは、「一関Basie」マスター菅原正二氏、ハイソはBasie志向のバンドだったと思われます）</p>
<p>その頃私自身は硬式庭球部に所属していたが、パートナーからもジャズ部創部への後押しもあり、たまたま友人にドラムとギターの達者がいたので、一緒にビッグバンドを作ろうという話が進んだ。</p>
<p>最初のメンバーは10人で、楽器経験の無いメンバーが半数。もちろん経験者もジャズ演奏は初めてという状態でスタート。2年目5人、3年目9人と徐々に楽器経験のある人が入部し本格的にスタートを切ることができた。</p>
<p>メンバー集めだけでなく、はじめは大変な思いをたくさんした。</p>
<p>まず楽器の購入で、1台の値段が大卒社会人の1年分の給与か2年分の給与だったので、学生のバイトで賄うのは至難の業であった。一方でイ号館の大講堂にあったボロボロのグランドピアノを大学からタダで貰えたので、明道館まで皆で運んだのも思い出である。</p>
<p>その後20年に渡って部で使われたバリトンサックスは、この頃のメンバー永井さんが購入したもの。</p>
<p>世の中にわずかにジャズミュージックへの偏見もあり、活動すること自体も大変だった。</p>
<p>また、譜面が売っていないので、今思えばコードも間違いだらけながらテープを聴きながら、皆でコピーして譜面を作っていった。</p>
<p>譜面台（註：トリパック）も、売っていないので、材木屋に行って製材を買ってきて、切ったり蝶番を付けたり色を塗ったりして、皆で協力して作った。</p>
<p>（註：初めての演奏会は1965年6月三大学コンサートで、In The Mood、Showboat Shuffle（Ellington）の他、手をつけ始めたベイシーのRockin' The Blues、One O'clock Jump、Jive At Fiveを演奏。）</p>
<p>結成2年後には、グレンミラーやベニーグッドマンを卒業してベイシーを中心に演奏するようになった。</p>
<p>なんと言っても技術が足りない、Swingのノリができない、気分ではわかってるんだけれども、どうやればいいかわからない。これは、道は遠いなぁと思ったが、第一回定期演奏会（註：1965/11/27阪大中之島講堂）もやり始めてしまったし、止めるわけにはいかない、ということで次の代へ託していった。</p>
<p>文：Swing Academy Orchestra 創設者、初代リーダー 梶村皓司（ts, p）さん（註は本多さん記載）</p>
<h3>The New Wave Jazz Orchestra</h3>
<p>当時コンマスだった私がSwing Academyという名前が古めかしく権威主義的な響きがすることについて、石橋の「ほろ酔い」でいつもの軽音楽部メンバーと話をしていたら、そこにいたメンバーの賛同が得られることになった。</p>
<p>そこで当時のメンバーに新しいバンド名の募集をかけたところ、数件のアイデアが出てきたので、石橋のジャズ喫茶V7の場でバンド名決定会議が開かれることになった。名物のドライカレーとか食べながらだったと思う。そこで、New-Wave Jazz Orchestraが誕生したのだが、この名前を提案したのは私と同期のTBの松崎宏幸さんでした。</p>
<p>確してNew Wave Jazz Orchestraが誕生。</p>
<p>1979年初代コンマス武田雅宏率いる新生NewWaveは、定演では1曲もBasieナンバーをやらなかった。また、この年BasieをやらないNewWaveで山野BBJCに出れるか、D年の竹之内健（As）氏が偵察に行き、その答えが、「入賞はできないが、恥をかくことも無いでしょう」ということで、翌年山野への初出場を決め、ユニフォームとして法被を作った。</p>
<p>文：1978年 Swing Academy Orchestra リーダー 吉森崇（p）さん</p>
`

const STORY_SAO = `
<h3>Swing Arcade Orchestra</h3>
<p>まだコロナ前の'10年代前半、軽音SWINGはそれは賑わっていました。各学年それぞれ部員50名、ひと学年にギター6人・ドラム6人なんてのもざらでした。当然その全員がNWに参加する訳はなく、NWに入らない部員はE年には引退する流れが一般的でした。</p>
<p>「いや、これで終わってられるかよ……！」と静かに情熱を燃やした部員が多かった2012年。加えて、当時はD軍でもロックやサンバ、ラテンなどのジャンルを演奏する機会も多く、「4ビートよりそっちのジャンルももっとしたいなあ」という部員が多かったのも事実でした。</p>
<p>そんな中、親切なOBさんが「国際ジャズオーケストラ・フェスティバル（通称ステラジャム）」という大会を紹介してくれました。こうして、関西のD軍と関東のジュニア・バンドの中間的立ち位置として SAO は発足しました。</p>
<p>初参加となる2013年のステラジャムでは、Get Better 6（6位以内入賞相当）、そしてベース木下恭子が個人賞を受賞。その後もバンドとして・個人としての入賞を何度も重ねてきました。阪大スウィングから次のステップへの通り道（Arcade）としての機能を果たすバンドであれば、これ幸いです。</p>
<p>文：2011年入学 高田悠（p）さん</p>
`

const STORY_BS = `
<h3>日本E軍 Monkey Club Jazz Orchestra</h3>
<p>1991年入学のトランペット阿部泰也は、New Wave Jazz Orchestra で演奏する傍らD軍バンドにも参加し、D年の時にはそのコンマスを任された。しかし例年D軍でやってるレパートリーだけでは飽き足らず、京都大学Dark Blue JOのメンバーに頼み込んで譜面を貸してもらいDuke Ellingtonの音楽へ足を踏み入れた。</p>
<p>合宿の発表ではOBからケチョンケチョンに言われながらも「極めてやる！」と決意。そして1993年にバンド結成。阪大坂下にあったデニーズで練習後集まって「D軍の次やからE軍やろ？Ellingtonやし！」「メンバーは猿みたいなやつばっかりやしMonkeyか？」といとも簡単に決まりました。</p>
<p>結成したその年にビデオ審査に合格して「神戸ジャズコンベンション」に出場。続けて「天保山ビッグバンドコンペティション」にも出場し、トランペット阿部が優秀ソリスト賞を受賞。そして1994年、第25回ヤマノビッグバンドジャズコンテストに初出場し、まさかの「スイングジャーナル社賞」受賞の快挙。明治、慶應、阪大NWに続く4位でした。</p>
<p>続く1995年もヤマノに出場して「奨励賞」を受賞。受賞にはこだわらず、多くの方々に音楽を楽しんで貰いたいという想いが結果的に好評価に繋がりました。「阪大はNew Waveだけではないよ！」という雰囲気が出来上がりました。</p>
<p>文：創設者 阿部泰也（Tp）さん</p>
`

export const DEFAULT_BANDS: Band[] = [
  {
    id: 'bsjo',
    slug: 'bsjo',
    name: 'Blue Spirits Jazz Orchestra',
    desc: '入部した部員が加入するビッグバンドです。先輩に教わりながら、ジャズを楽しんでいきます。',
    desc_en:
      'The big band that all new members join. Learn jazz step by step with guidance from senior members.',
    points: [
      '主に1回生と2回生（C年・D年）で組むバンドです',
      '合奏は週1〜2回です。学内のイベントでの演奏が中心で、学外のイベントに出ることもあります',
      '2025年までは年ごとにバンド名を決めていました。2026年から Blue Spirits Jazz Orchestra の名前で活動しています',
    ],
    points_en: [
      'Made up mainly of first- and second-year students',
      'Rehearses once or twice a week. Plays mostly at campus events, sometimes at outside events too',
      'Until 2025 the band took a new name each year. Since 2026 it has played as Blue Spirits Jazz Orchestra',
    ],
    story: STORY_BS,
  },
  {
    id: 'sao',
    slug: 'sao',
    name: 'Swing Arcade Orchestra',
    desc: 'ファンクやフュージョンを中心に、オールジャンルに挑戦するバンドです。1年間同じメンバーで活動します。',
    desc_en:
      'A band that takes on all genres, centered on funk and fusion. Members stay together for one full year.',
    points: [
      'スウィングだけでなく、ファンクやコンテンポラリー・ジャズなど、いろいろなジャンルのジャズを演奏します',
      '毎年、国際ジャズオーケストラ・フェスティバル（ステラジャム）に出場しています',
      '合奏は週2回です。ほかのバンドとのライブやイベントにも出ます',
    ],
    points_en: [
      'Plays many styles of jazz beyond swing, including funk and contemporary jazz',
      'Enters the International Jazz Orchestra Festival (Stellar Jam) every year',
      'Rehearses twice a week and plays at joint gigs and events',
    ],
    story: STORY_SAO,
  },
  {
    id: 'tnwjo',
    slug: 'tnwjo',
    name: 'The New Wave Jazz Orchestra',
    desc: 'ジャズの巨匠カウント・ベイシーの楽曲のみを演奏するバンドです。1年間同じメンバーで活動します。',
    desc_en:
      'A band dedicated exclusively to the music of jazz legend Count Basie. Members stay together for one full year.',
    points: [
      'ジャズピアニスト Count Basie の曲だけを演奏します',
      '毎年夏の山野ビッグバンドジャズコンテストに出場しています。記録は歴史のページにあります',
      '合奏は週3回です。合宿や遠征も多く、ほかのバンドとのライブにもよく出ます',
    ],
    points_en: [
      'Plays only the music of jazz pianist Count Basie',
      'Enters the Yamano Big Band Jazz Contest every summer. Past results are on the History page',
      'Rehearses three times a week, with frequent camps, tours and joint gigs',
    ],
    story: STORY_NW,
  },
]

const H = (
  year: number,
  kind: HistoryKind,
  text: string,
  text_en: string,
  i: number,
): HistoryEntry => ({
  id: `default-${year}-${i}`,
  year,
  kind,
  text,
  text_en,
})

export const DEFAULT_HISTORY: HistoryEntry[] = [
  H(1961, 'start', '軽音楽部ハワイアン創立', 'Hawaiian band founded', 0),
  H(1962, 'start', '軽音楽部として承認', 'Approved as a light music club', 1),
  H(1962, 'start', '軽音楽部カントリー設立', 'Country band founded', 2),
  H(
    1963,
    'start',
    '軽音楽部スウィング設立（Swing Academy Orchestra スタート）',
    'Swing founded, starting Swing Academy Orchestra',
    3,
  ),
  H(
    1964,
    'start',
    'カントリーがロックとウエスタンに分離',
    'Country splits into Rock and Western',
    4,
  ),
  H(
    1964,
    'concert',
    '第一回大阪3大学軽音楽の定期演奏会開催',
    'First Osaka three-university light music concert',
    5,
  ),
  H(
    1965,
    'concert',
    '大阪大学軽音楽部 第一回定期演奏会開催',
    'First regular concert of the club',
    6,
  ),
  H(1965, 'start', 'ディキシー設立', 'Dixieland band founded', 7),
  H(1966, 'start', 'フォーク設立', 'Folk band founded', 8),
  H(1966, 'start', 'モダンジャズ設立', 'Modern Jazz band founded', 9),
  H(1969, 'end', 'フォーク解散', 'Folk band disbanded', 10),
  H(
    1969,
    'contest',
    'スウィングとウエスタンがバンド合戦近畿大会に出場',
    'Swing and Western play at the Kinki band contest',
    11,
  ),
  H(
    1970,
    'contest',
    'スウィングが YAMAHA Light Music Contest の関西代表として全国決勝大会に出場',
    'Swing represents Kansai at the national final of the YAMAHA Light Music Contest',
    12,
  ),
  H(1972, 'end', 'ハワイアン解散', 'Hawaiian band disbanded', 13),
  H(1973, 'end', 'カントリー解散', 'Country band disbanded', 14),
  H(1974, 'end', 'ウエスタン解散', 'Western band disbanded', 15),
  H(
    1976,
    'end',
    'モダンジャズがスウィングに吸収',
    'Modern Jazz merges into Swing',
    16,
  ),
  H(
    1978,
    'concert',
    'ロックとスウィングの最後の合同定期演奏会開催',
    'Last joint regular concert of Rock and Swing',
    17,
  ),
  H(
    1979,
    'start',
    'Swing Academy Orchestra が改名し、The New Wave Jazz Orchestra スタート（法被誕生）',
    'Swing Academy Orchestra is renamed The New Wave Jazz Orchestra (the happi coat uniform is born)',
    18,
  ),
  H(
    1979,
    'concert',
    '定期演奏会をスウィングとロックで別々に開くようになる',
    'Swing and Rock begin holding separate regular concerts',
    19,
  ),
  H(
    1994,
    'start',
    '日本E軍 Monkey Club Jazz Orchestra 誕生',
    'Monkey Club Jazz Orchestra is formed',
    20,
  ),
  H(
    2010,
    'start',
    'Swing Arcade Orchestra 誕生',
    'Swing Arcade Orchestra is formed',
    21,
  ),
  H(
    2026,
    'start',
    'D軍が改名し、Blue Spirits Jazz Orchestra スタート',
    'The D-gun band is renamed Blue Spirits Jazz Orchestra',
    22,
  ),
]

// The New Wave Jazz Orchestra の山野ビッグバンドジャズコンテストの記録
const Y = (
  year: number,
  result: string,
  prize?: string,
  extra: {
    soloists?: string[]
    others?: string[]
    concertmaster?: string
  } = {},
): Award => ({
  id: `default-yamano-${year}`,
  band: 'tnwjo',
  contest: 'yamano',
  year,
  result,
  prize,
  ...extra,
})

const S = (name: string) => `優秀ソリスト賞 ${name}`
const SS = (name: string) => `最優秀ソリスト賞 ${name}`

export const DEFAULT_AWARDS: Award[] = [
  Y(1980, '順位不明', undefined, { others: ['審査員賞 中島教秀（ba）'] }),
  Y(1981, '順位不明'),
  Y(1982, '出場せず'),
  Y(1983, '4位', 'Swing Journal賞'),
  Y(1984, '5位', 'TBSラジオ賞', { soloists: [S('上田美恵（vo）')] }),
  Y(1985, '8位', '審査員賞'),
  Y(1986, '順位不明', undefined, { soloists: [S('切手崇博（as）')] }),
  Y(1987, '4位', 'Swing Journal賞'),
  Y(1988, '8位', '審査員賞'),
  Y(1989, '2位', '優秀賞'),
  Y(1990, '6位', '特別賞', { others: ['審査員賞 リズムセクション'] }),
  Y(1991, '10位', '奨励賞'),
  Y(1992, '8位', '審査員賞'),
  Y(1993, '3位', '優秀賞', { soloists: [S('里村稔（ts）')] }),
  Y(1994, '3位', '優秀賞', { soloists: [SS('日比野則彦（ts）')] }),
  Y(1995, '1位', '最優秀賞'),
  Y(1996, '2位', '優秀賞', { concertmaster: '武島聡（ts）' }),
  Y(1997, '2位', '優秀賞', { concertmaster: '絹原一寛（tp）' }),
  Y(1998, '7位', '特別賞', { concertmaster: '佐藤崇（tb）' }),
  Y(1999, '5位', 'TBSラジオ賞', {
    soloists: [S('公楽省吾（ts）')],
    concertmaster: '公楽省吾（ts）',
  }),
  Y(2000, '4位', 'Swing Journal賞', { concertmaster: '五十嵐誠（tb）' }),
  Y(2001, '5位', 'TBSラジオ賞', {
    soloists: [S('五十嵐誠（tb）')],
    concertmaster: '大竹亜矢子（ts）',
  }),
  Y(2002, '7位', '敢闘賞', { concertmaster: '石原裕也（as）' }),
  Y(2003, '6位', '特別賞', { concertmaster: '酒井大樹（gt）' }),
  Y(2004, '17位', undefined, { concertmaster: '舟橋大（btb）' }),
  Y(2005, '11位', undefined, { concertmaster: '石川洋輔（tb）' }),
  Y(2006, '3位', '優秀賞', { concertmaster: '當村邦明（ts）' }),
  Y(2007, '7位', '特別賞', { concertmaster: '橋本利恵（pf）' }),
  Y(2008, '4位', 'Swing Journal賞', {
    soloists: [SS('當村邦明（ts）')],
    concertmaster: '外池誠基（tp）',
  }),
  Y(2009, '7位', '特別賞', { concertmaster: '横田純己（ba）' }),
  Y(2010, '6位', '日刊スポーツ賞', { concertmaster: '久木田亮（tp）' }),
  Y(2011, '17位', undefined, { concertmaster: '吾妻陽介（tp）' }),
  Y(2012, '5位', 'Inter FM賞', { concertmaster: '西村祐一（btb）' }),
  Y(2013, '6位', '日刊スポーツ賞', { concertmaster: '澤井彩（btb）' }),
  Y(2014, '4位', 'さいたま市長賞', { concertmaster: '高見翔馬（as）' }),
  Y(2015, '7位', '特別賞', {
    soloists: [S('穐山凌（ts）')],
    concertmaster: '穐山凌（ts）',
  }),
  Y(2016, '6位', '学バンアワード', {
    soloists: [SS('安藤達也（ts）')],
    concertmaster: '安藤達也（ts）',
  }),
  Y(2017, '9位', '審査員賞', { concertmaster: '吉田朋美（tp）' }),
  Y(2018, '4位', undefined, { concertmaster: '池川風哉（as）' }),
  Y(2019, '10位', '奨励賞', { concertmaster: '細川涼介（tb）' }),
  Y(2020, 'コンサート形式', undefined, { concertmaster: '青塚皓平（tb）' }),
  Y(2021, 'コンサート形式', undefined, { concertmaster: '青塚皓平（tb）' }),
  Y(2022, '9位', '学バンアワード', { concertmaster: '井野涼介（tb）' }),
  Y(2023, '13位', undefined, { concertmaster: '園恵太朗（ts）' }),
  Y(2024, '9位', '学バンアワード', { concertmaster: '足立和志（tp）' }),
  Y(2025, '5位', '学バンアワード', {
    soloists: [S('井上優平（ts）')],
    concertmaster: '寺野良佑（tb）',
  }),
  Y(2026, '3位', '優秀賞', { concertmaster: '鈴木魁（tb）' }),
]
