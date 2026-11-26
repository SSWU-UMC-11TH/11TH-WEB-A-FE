import type { ReactNode } from "react";
import Providers from "./providers";
import { Header } from "../components/layout/header";
import "../index.css";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}