import type { Metadata } from "next";
import { Providers } from "../providers";
import { fonts } from "../fonts";

export const metadata: Metadata = {
  title: "Expense Tracker | 記帳App",
  description: "簡單好用的線上記帳App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fonts.poppins.variable} ${fonts.notoSansTC.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
