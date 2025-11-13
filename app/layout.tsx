import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
// CSS Modules のインポート
import styles from "./layout.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "W杯注目国・選手名鑑",
  description: "Next.jsとmicroCMSで作成したW杯ガイドサイト",
};

// ヘッダーコンポーネント (ファイル内で定義)
function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.title}>
          {/* タイトルテキストを削除 */}
        </Link>
      </div>
    </header>
  );
}

// フッターコンポーネント (ファイル内で定義)
function Footer() {
  return (
    <footer className={styles.footer}>
      <p>&copy; 2025 期末課題. All rights reserved.</p>
    </footer>
  );
}

// ルートレイアウト
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className={styles.wrapper}>
          <Header />
          <main className={styles.main}>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
