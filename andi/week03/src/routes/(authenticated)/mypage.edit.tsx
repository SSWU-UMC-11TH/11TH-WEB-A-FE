import { createFileRoute } from "@tanstack/react-router";
import { MyPageEdit } from "../../pages/auth/mypage-edit";

export const Route = createFileRoute("/(authenticated)/mypage/edit")({
  component: MyPageEdit,
});