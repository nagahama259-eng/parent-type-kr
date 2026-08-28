import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://parent-type-kr.vercel.app"),
  title: "부모 성향 테스트 — 우리 아이 맞춤 케어 가이드",
  description:
    "20문항으로 알아보는 우리 부부의 육아 스타일. 유형별 아이 성장 방향과 맞춤 케어 팁까지.",
  openGraph: {
    title: "부모 성향 테스트 — 우리 아이 맞춤 케어 가이드",
    description: "20문항으로 알아보는 우리 부부의 육아 스타일",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "부모 성향 테스트 — 우리 아이 맞춤 케어 가이드",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3327936243983932"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
