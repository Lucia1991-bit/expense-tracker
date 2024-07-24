import type { Metadata } from "next";
import { Providers } from "../providers";
import { fonts } from "../fonts";
import Navbar from "../components/Navbar";
import { Box } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "記帳小幫手",
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
        <Providers>
          <Navbar />
          <Box as="main" pt="60px">
            {children}
          </Box>
        </Providers>
      </body>
    </html>
  );
}
