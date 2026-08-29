import { getAllNovels } from "@/lib/novels";
import NovelCard from "@/components/NovelCard";

export const metadata = {
  title: "小説一覧｜Boys Archive",
};

export default function NovelsPage() {
  const novels = getAllNovels();

  return (
    <div>
      <h1 className="font-mincho text-2xl tracking-wide2 mb-2">小説一覧</h1>
      <p className="text-sm text-ink-soft mb-10">全 {novels.length} 件</p>

      {novels.length === 0 ? (
        <p className="text-sm text-ink-soft py-10 text-center">
          まだ作品が登録されていません。
        </p>
      ) : (
        novels.map((novel, i) => (
          <NovelCard key={novel.slug} novel={novel} index={i} />
        ))
      )}
    </div>
  );
}
