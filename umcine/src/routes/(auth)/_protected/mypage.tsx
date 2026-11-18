import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)/_protected/mypage')({
  component: Outlet,
});
