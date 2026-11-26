import type { Metadata } from "next";
import type { ReactNode } from "react";
import { pretendard } from "./fonts";
import { Suspense } from "react";
import Providers from "./providers";
import Header from "@/components/layout/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "UMCine",
  description: "영화를 검색하고 평점과 리뷰를 기록하는 서비스",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className={pretendard.variable}>
        <Providers>
          <Suspense
            fallback={
              <div className="h-[91px] w-full border-b border-[#E3E6EB] bg-white" />
            }
          >
            <Header />
          </Suspense>

          {children}
        </Providers>
      </body>
    </html>
  );
}
