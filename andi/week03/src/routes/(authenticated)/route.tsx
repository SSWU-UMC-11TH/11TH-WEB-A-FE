
import {
  createFileRoute,
  Navigate,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { useAuthStore } from "../../stores/auth-store";

function AuthenticatedLayout() {
  const accessToken = useAuthStore(
    (state) => state.accessToken,
  );

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export const Route = createFileRoute("/(authenticated)")({
  beforeLoad: () => {
    if (!useAuthStore.getState().accessToken) {
      throw redirect({ to: "/login" });
    }
  },
  component: AuthenticatedLayout,
});
