import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllNovels, getNovelBySlug } from "@/lib/novels";

export async function generateStaticParams() {
  const novels = getAllNovels();
  return novels.map((novel) => ({ slug: novel.slug }));
}

export async function generateMetadata({ params }) {
  const novel = await getNovelBySlug(params.slug);
  if (!novel) return {};
  return { title: `${novel.title}｜Boys Archive` };
}

export default async function NovelDetailPage({ params }) {
  const novel = await getNovelBySlug(params.slug);
  if (!novel) notFound();

  const allNovels = getAllNovels();
  const currentIndex = allNovels.findIndex((n) => n.slug === novel.slug);
  const prevNovel = allNovels[currentIndex + 1]; // 一つ古い
  const nextNovel = allNovels[currentIndex - 1]; // 一つ新しい

  return (
    <article>
      <Link href="/novels" className="text-xs text-ink-soft hover:text-seal">
        ← 一覧に戻る
      </Link>

      <header className="mt-6 mb-10 border-b hairline pb-8">
        <h1 className="font-mincho text-2xl sm:text-3xl leading-snug mb-4">
          {novel.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs text-ink-soft">{novel.date}</span>
          <div className="flex flex-wrap gap-2">
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
      </header>

      <div
        className="prose-novel text-[15px] leading-[2] text-ink whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: novel.contentHtml }}
      />

      <nav className="mt-16 pt-8 border-t hairline flex justify-between text-sm">
        {prevNovel ? (
          <Link href={`/novels/${prevNovel.slug}`} className="text-ink-soft hover:text-seal">
            ← {prevNovel.title}
          </Link>
        ) : (
          <span />
        )}
        {nextNovel ? (
          <Link href={`/novels/${nextNovel.slug}`} className="text-ink-soft hover:text-seal">
            {nextNovel.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
