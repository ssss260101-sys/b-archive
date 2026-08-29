# Boys Archive

BL体験談・ゲイ体験談アーカイブサイト。Next.js + Markdown + Supabase構成。

## 今回の実装範囲(フェーズ1)

- ホーム／小説一覧／作品詳細／カテゴリ検索（タグAND/OR切替）／体験談投稿フォーム
- 年齢確認ゲート（初回訪問時のみ、以降はブラウザに記憶）
- 作品データは `content/novels/` のMarkdownファイルで管理

## まだ実装していない部分(フェーズ2で対応予定)

- 管理画面(`/admin`)：投稿の承認・却下
- 承認された投稿をサイトに自動反映する処理
- Supabaseの `submissions` テーブル本体の作成(SQLは下記)

## セットアップ手順

### 1. 依存パッケージのインストール

```bash
npm install
```

### 2. Supabaseプロジェクトを作成

1. https://supabase.com で無料アカウントを作成し、新規プロジェクトを作成
2. プロジェクトの `Settings > API` から `Project URL` と `anon public key` を取得
3. `.env.local.example` を `.env.local` にコピーし、取得した値を入力

### 3. Supabaseに投稿受付用テーブルを作成

Supabaseの SQL Editor で以下を実行してください。

```sql
create table submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  title text not null,
  body text not null,
  tags text[] default '{}',
  contact text,
  status text default 'pending'
);
```

### 4. ローカルで動作確認

```bash
npm run dev
```

`http://localhost:3000` を開いて確認してください。

### 5. GitHub + Vercelでデプロイ

1. このフォルダの中身をGitHubリポジトリにpush
2. https://vercel.com でGitHubアカウント連携し、リポジトリをインポート
3. Vercelの環境変数設定に `.env.local` と同じ内容を追加
4. デプロイ完了後、発行されたURLでサイトが公開されます

## 作品を追加する方法

`content/novels/` に新しい `.md` ファイルを作成してください。ファイル名は
`YYYY-MM-DD-識別名.md` の形式を推奨します。

```markdown
---
title: "作品タイトル"
date: "2024-06-01"
tags: ["純愛", "職場"]
excerpt: "一覧に表示する短い紹介文"
---

ここに本文を書きます。
```

Claude Codeを使う場合は「`content/novels/`にある既存ファイルと同じ形式で、
タイトル『〇〇』、タグ『△△』の新しい作品を追加して」と依頼すれば、
ファイルの作成まで行ってもらえます。
