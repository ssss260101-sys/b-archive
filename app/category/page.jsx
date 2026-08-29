import { getAllNovels, getAllTags } from "@/lib/novels";
import TagFilter from "@/components/TagFilter";

export const metadata = {
  title: "カテゴリ検索｜Boys Archive",
};

export default function CategoryPage() {
  const novels = getAllNovels();
  const allTags = getAllTags();

  return (
    <div>
      <h1 className="font-mincho text-2xl tracking-wide2 mb-2">カテゴリ検索</h1>
      <p className="text-sm text-ink-soft mb-10">
        ジャンル・シチュエーションのタグから作品を絞り込めます。
      </p>

      {allTags.length === 0 ? (
        <p className="text-sm text-ink-soft py-10 text-center">
          タグが登録された作品がまだありません。
        </p>
      ) : (
        <TagFilter novels={novels} allTags={allTags} />
      )}
    </div>
  );
}
