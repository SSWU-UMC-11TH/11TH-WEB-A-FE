import { createFileRoute } from '@tanstack/react-router';
import { MyPage } from '../../../pages/mypage/mypage';

export const Route = createFileRoute('/(auth)/_protected/mypage/')({
  component: MyPage,
});
