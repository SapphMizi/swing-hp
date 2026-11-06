// 記事がまだないときの表示
export function EmptyState({ text }: { text: string }) {
  return (
    <p className="rounded-[1.75rem] border-2 border-ink bg-paper-light px-6 py-8 font-bold">
      {text}
    </p>
  )
}
