import { createFileRoute } from "@tanstack/react-router";
import { MyRatingsPage } from "../pages/rating-page";

export const Route = createFileRoute("/rating")({
  component: MyRatingsPage,
});
