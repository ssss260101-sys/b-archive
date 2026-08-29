import Link from "next/link";

export default function NovelCard({ novel, index }) {
  return (
    <Link
      href={`/novels/${novel.slug}`}
      className="group block border-b hairline py-6 first:pt-0"
    >
      <div className="flex items-baseline gap-4">
        <span className="font-mincho text-ink-soft text-sm w-8 shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-mincho text-lg text-ink group-hover:text-seal transition-colors">
            {novel.title}
          </h3>
          {novel.excerpt && (
            <p className="text-sm text-ink-soft mt-1.5 leading-relaxed line-clamp-2">
              {novel.excerpt}
            </p>
          )}
          <div className="flex flex-wrap gap-2 mt-3">
            {(novel.tags || []).map((tag) => (
              <span
                key={tag}
                className="text-[11px] tracking-wide px-2 py-0.5 border border-seal-line text-seal rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        {novel.date && (
          <span className="text-xs text-ink-soft shrink-0 hidden sm:block">
            {novel.date}
          </span>
        )}
      </div>
    </Link>
  );
}
