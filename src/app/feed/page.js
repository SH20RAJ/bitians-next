import MainLayout from '../../components/layout/MainLayout';
import FeedContainer from '../../components/feed/FeedContainer';

export const metadata = {
  title: 'Feed | BITians',
  description: 'Your personalized feed on BITians social media platform',
};

export default function FeedPage() {
  return (
    <MainLayout>
      <FeedContainer />
    </MainLayout>
  );
}
