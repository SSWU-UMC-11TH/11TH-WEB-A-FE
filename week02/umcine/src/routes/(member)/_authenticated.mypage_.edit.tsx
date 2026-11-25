import { createFileRoute } from "@tanstack/react-router";
import { MyPageEditPage } from "../../pages/mypage-edit";

export const Route = createFileRoute(
  "/(member)/_authenticated/mypage_/edit",
)({
  component: MyPageEditPage,
});