export default function Footer() {
  return (
    <footer className="border-t hairline mt-24">
      <div className="max-w-4xl mx-auto px-6 py-10 text-center text-ink-soft text-xs leading-relaxed">
        <p className="mb-2">
          Boys Archive に掲載されている作品はすべてフィクションです。実在の人物・団体とは関係ありません。
        </p>
        <p>© {new Date().getFullYear()} Boys Archive</p>
      </div>
    </footer>
  );
}
