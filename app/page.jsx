import Link from "next/link";
import { getAllNovels } from "@/lib/novels";
import NovelCard from "@/components/NovelCard";

export default function Home() {
  const novels = getAllNovels().slice(0, 5);

  return (
    <div>
      <section className="mb-20 text-center">
        <div className="seal-mark w-14 h-14 mx-auto mb-6 text-lg font-mincho font-bold">
          紳
        </div>
        <h1 className="font-mincho text-3xl sm:text-4xl tracking-wide2 mb-4">
          Boys Archive
        </h1>
        <p className="text-sm text-ink-soft tracking-wide2 mb-8">
          BL体験談・ゲイ体験談アーカイブ
        </p>
        <p className="max-w-md mx-auto text-sm text-ink-soft leading-relaxed">
          ここに集められた記録は、すべて男性同士の性愛を主題としたフィクションです。
          静かな部屋で紙をめくるように、お好きな作品をお選びください。
        </p>
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-6 border-b hairline pb-3">
          <h2 className="font-mincho text-sm tracking-wide2 text-ink-soft">
            新着の記録
          </h2>
          <Link href="/novels" className="text-xs text-seal hover:underline">
            すべて見る →
          </Link>
        </div>
        {novels.length === 0 ? (
          <p className="text-sm text-ink-soft py-10 text-center">
            まだ作品が登録されていません。content/novels/ にMarkdownファイルを追加してください。
          </p>
        ) : (
          novels.map((novel, i) => (
            <NovelCard key={novel.slug} novel={novel} index={i} />
          ))
        )}
      </section>
    </div>
  );
}
