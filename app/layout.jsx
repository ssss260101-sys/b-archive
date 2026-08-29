import "./globals.css";
import AgeGate from "@/components/AgeGate";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Boys Archive｜BL体験談・ゲイ体験談アーカイブ",
  description:
    "男性同士の性愛に特化した体験談風フィクションを集めたアーカイブサイトです。18歳未満の方はご利用いただけません。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className="font-sans min-h-screen flex flex-col antialiased">
        <AgeGate />
        <Header />
        <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-14">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
