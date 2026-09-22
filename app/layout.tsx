import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fileredge | File Your Tax Return",
  description: "A fast, secure and compliant way to file your Pakistan tax return.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full scroll-smooth antialiased"
    >
      <body className="flex min-h-full flex-col bg-white font-sans leading-[normal] text-ink">{children}</body>
    </html>
  );
}
