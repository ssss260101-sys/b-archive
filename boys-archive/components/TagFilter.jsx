"use client";

import { useMemo, useState } from "react";
import NovelCard from "./NovelCard";

export default function TagFilter({ novels, allTags }) {
  const [selectedTags, setSelectedTags] = useState([]);
  const [mode, setMode] = useState("OR"); // "AND" | "OR"

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filtered = useMemo(() => {
    if (selectedTags.length === 0) return novels;
    return novels.filter((novel) => {
      const novelTags = novel.tags || [];
      if (mode === "AND") {
        return selectedTags.every((t) => novelTags.includes(t));
      }
      return selectedTags.some((t) => novelTags.includes(t));
    });
  }, [novels, selectedTags, mode]);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-mincho text-sm tracking-wide2 text-ink-soft">
          タグで絞り込む
        </h2>
        <div className="flex items-center gap-1 text-xs border hairline rounded-full p-0.5">
          {["OR", "AND"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={`px-3 py-1 rounded-full transition-colors ${
                mode === m ? "bg-seal text-paper" : "text-ink-soft"
              }`}
            >
              {m === "OR" ? "いずれか含む" : "すべて含む"}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {allTags.map((tag) => {
          const active = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              aria-pressed={active}
              className={`text-xs tracking-wide px-3 py-1.5 rounded-full border transition-colors ${
                active
                  ? "bg-seal text-paper border-seal"
                  : "border-seal-line text-seal hover:bg-seal-soft"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-ink-soft mb-4">
        {selectedTags.length === 0
          ? `全 ${filtered.length} 件`
          : `該当 ${filtered.length} 件`}
      </p>

      <div>
        {filtered.length === 0 ? (
          <p className="text-sm text-ink-soft py-10 text-center">
            該当する作品が見つかりませんでした。タグの組み合わせを変えてお試しください。
          </p>
        ) : (
          filtered.map((novel, i) => (
            <NovelCard key={novel.slug} novel={novel} index={i} />
          ))
        )}
      </div>
    </div>
  );
}
