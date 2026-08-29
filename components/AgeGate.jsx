"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "boys-archive-age-verified";

export default function AgeGate() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const verified = window.localStorage.getItem(STORAGE_KEY);
    if (!verified) {
      setVisible(true);
      document.body.style.overflow = "hidden";
    }
  }, []);

  const handleEnter = () => {
    window.localStorage.setItem(STORAGE_KEY, "true");
    document.body.style.overflow = "";
    setVisible(false);
  };

  const handleLeave = () => {
    window.location.href = "https://www.google.com";
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 px-6"
    >
      <div className="max-w-md w-full text-center text-paper">
        <div className="seal-mark w-16 h-16 mx-auto mb-6 text-xl font-mincho border-paper text-paper">
          18
        </div>
        <h2 id="age-gate-title" className="font-mincho text-xl mb-4 tracking-wide2">
          年齢確認
        </h2>
        <p className="text-sm leading-relaxed text-paper/80 mb-2">
          当サイトは成人向けの内容（男性同士の性愛描写を含むBL・ゲイ体験談風フィクション）を含みます。
        </p>
        <p className="text-sm leading-relaxed text-paper/80 mb-8">
          18歳未満の方のご利用はお断りしております。あなたは18歳以上ですか？
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleEnter}
            className="px-8 py-3 bg-seal text-paper text-sm tracking-wide2 hover:bg-seal/90 transition-colors"
          >
            18歳以上です
          </button>
          <button
            onClick={handleLeave}
            className="px-8 py-3 border border-paper/40 text-paper/70 text-sm tracking-wide2 hover:bg-paper/10 transition-colors"
          >
            退出する
          </button>
        </div>
      </div>
    </div>
  );
}
