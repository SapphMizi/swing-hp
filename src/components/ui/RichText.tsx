// microCMS のリッチエディタの HTML を表示する。
// 入力できるのは microCMS のメンバー(広報担当)だけなので、HTML はそのまま信頼して出す。
export function RichText({ html }: { html: string }) {
  return (
    <div
      className="prose prose-lg max-w-[68ch] text-ink prose-headings:font-black prose-headings:text-ink prose-a:text-pink-deep prose-strong:text-ink prose-img:rounded-sm prose-blockquote:border-0 prose-blockquote:rounded-xl prose-blockquote:bg-yellow/60 prose-blockquote:px-6 prose-blockquote:py-1 prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:text-ink"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
