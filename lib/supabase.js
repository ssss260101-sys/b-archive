import { createClient } from "@supabase/supabase-js";

// NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY は
// .env.local に設定してください（.env.local.example を参照）
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

/*
  Supabase側で作成が必要なテーブル（次フェーズでSQLを提供します）:

  submissions
  ---------------------------------
  id          uuid (primary key, default: gen_random_uuid())
  created_at  timestamp (default: now())
  title       text
  body        text
  tags        text[]
  contact     text (任意・投稿者への連絡用、非公開)
  status      text (default: 'pending')  -- 'pending' | 'approved' | 'rejected'
*/
