import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request) {
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabaseが設定されていません。.env.localを確認してください。" },
      { status: 500 }
    );
  }

  const body = await request.json();
  const { title, body: content, tags, contact } = body;

  if (!title || !content) {
    return NextResponse.json({ error: "タイトルと本文は必須です。" }, { status: 400 });
  }

  const { error } = await supabase.from("submissions").insert({
    title,
    body: content,
    tags: tags || [],
    contact: contact || null,
    status: "pending",
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
