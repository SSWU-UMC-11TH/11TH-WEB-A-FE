import { createFileRoute } from "@tanstack/react-router";
import { MyPageEditPage } from "../pages/mypage-edit";

export const Route = createFileRoute("/mypage_/edit")({
  component: MyPageEditPage,
});