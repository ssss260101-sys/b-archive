"use client";

import { useState } from "react";

const AVAILABLE_TAGS = [
  "純愛",
  "職場",
  "学校",
  "出張先",
  "先輩後輩",
  "年齢差",
  "露出",
  "レイプ",
];

export default function SubmissionForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.target);
    const payload = {
      title: formData.get("title"),
      body: formData.get("body"),
      contact: formData.get("contact"),
      tags: selectedTags,
    };

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
      e.target.reset();
      setSelectedTags([]);
    } catch (err) {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="border hairline p-8 text-center">
        <p className="font-mincho text-lg mb-2">投稿を受け付けました</p>
        <p className="text-sm text-ink-soft leading-relaxed">
          運営による確認後、掲載の可否を判断のうえ公開いたします。公開までお時間をいただく場合がございます。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label htmlFor="title" className="block text-sm font-mincho mb-2">
          タイトル
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          maxLength={80}
          className="w-full border hairline bg-paper px-4 py-2.5 text-sm focus:border-seal outline-none"
        />
      </div>

      <div>
        <span className="block text-sm font-mincho mb-2">タグ（複数選択可）</span>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_TAGS.map((tag) => {
            const active = selectedTags.includes(tag);
            return (
              <button
                type="button"
                key={tag}
                onClick={() => toggleTag(tag)}
                aria-pressed={active}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
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
      </div>

      <div>
        <label htmlFor="body" className="block text-sm font-mincho mb-2">
          本文
        </label>
        <textarea
          id="body"
          name="body"
          required
          rows={14}
          className="w-full border hairline bg-paper px-4 py-3 text-sm leading-relaxed focus:border-seal outline-none"
        />
      </div>

      <div>
        <label htmlFor="contact" className="block text-sm font-mincho mb-2">
          連絡先（任意・非公開）
        </label>
        <input
          id="contact"
          name="contact"
          type="text"
          placeholder="確認が必要な場合のみ使用します"
          className="w-full border hairline bg-paper px-4 py-2.5 text-sm focus:border-seal outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="px-8 py-3 bg-seal text-paper text-sm tracking-wide2 hover:bg-seal/90 transition-colors disabled:opacity-50"
      >
        {status === "sending" ? "送信中…" : "投稿する"}
      </button>

      {status === "error" && (
        <p className="text-sm text-seal">
          送信に失敗しました。時間をおいて再度お試しください。
        </p>
      )}
    </form>
  );
}
