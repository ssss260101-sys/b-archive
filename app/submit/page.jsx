import SubmissionForm from "@/components/SubmissionForm";

export const metadata = {
  title: "体験談投稿｜Boys Archive",
};

export default function SubmitPage() {
  return (
    <div>
      <h1 className="font-mincho text-2xl tracking-wide2 mb-2">体験談投稿</h1>
      <p className="text-sm text-ink-soft mb-10 leading-relaxed">
        あなたの体験談（フィクションとして）を投稿できます。運営が内容を確認したのち、
        問題がなければサイトに掲載されます。掲載までお時間をいただく場合があります。
      </p>
      <SubmissionForm />
    </div>
  );
}
