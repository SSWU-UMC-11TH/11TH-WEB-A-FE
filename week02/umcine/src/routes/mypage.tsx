import { createFileRoute } from "@tanstack/react-router";
import { MyPage } from "../pages/mypage";

export const Route = createFileRoute("/mypage")({
  component: MyPage,
});