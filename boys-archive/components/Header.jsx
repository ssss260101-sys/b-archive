import Link from "next/link";

const navItems = [
  { href: "/", label: "ホーム" },
  { href: "/novels", label: "小説一覧" },
  { href: "/category", label: "カテゴリ検索" },
  { href: "/submit", label: "体験談投稿" },
];

export default function Header() {
  return (
    <header className="border-b hairline">
      <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="seal-mark w-9 h-9 text-xs font-mincho font-bold">
            紳
          </span>
          <span className="font-mincho text-lg tracking-wide2 text-ink">
            Boys Archive
          </span>
        </Link>
        <nav aria-label="グローバルナビゲーション">
          <ul className="flex gap-5 sm:gap-7 text-xs sm:text-sm tracking-wide text-ink-soft">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-seal transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
