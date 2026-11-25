import { createFileRoute } from "@tanstack/react-router";
import { MyPage } from "../../pages/mypage";

export const Route = createFileRoute(
  "/(member)/_authenticated/mypage",
)({
  component: MyPage,
});