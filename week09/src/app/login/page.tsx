import { Suspense } from "react";
import { LoginPage } from "@/screens/login-page";

export default function Page() {
  return (
    <Suspense fallback={<p>로딩 중...</p>}>
      <LoginPage />
    </Suspense>
  );
}