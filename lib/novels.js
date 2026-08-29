import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const novelsDirectory = path.join(process.cwd(), "content/novels");

// content/novels/ 内の全 .md ファイルから一覧データを取得
export function getAllNovels() {
  if (!fs.existsSync(novelsDirectory)) return [];

  const fileNames = fs.readdirSync(novelsDirectory).filter((f) => f.endsWith(".md"));

  const novels = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(novelsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || "無題",
      date: data.date || "",
      tags: data.tags || [],
      excerpt: data.excerpt || "",
    };
  });

  // 新しい日付順に並び替え
  return novels.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 特定の作品を1件取得し、本文をHTMLに変換して返す
export async function getNovelBySlug(slug) {
  const fullPath = path.join(novelsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(remarkHtml).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title || "無題",
    date: data.date || "",
    tags: data.tags || [],
    excerpt: data.excerpt || "",
    contentHtml,
  };
}

// 全作品からユニークなタグ一覧を抽出（カテゴリ検索用）
export function getAllTags() {
  const novels = getAllNovels();
  const tagSet = new Set();
  novels.forEach((novel) => {
    (novel.tags || []).forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}
