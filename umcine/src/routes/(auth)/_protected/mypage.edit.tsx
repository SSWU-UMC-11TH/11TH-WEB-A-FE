import { createFileRoute } from '@tanstack/react-router';
import { EditPage } from '../../../pages/mypage/edit-page';

export const Route = createFileRoute('/(auth)/_protected/mypage/edit')({
  component: EditPage,
});
