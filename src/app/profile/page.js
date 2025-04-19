import MainLayout from '../../components/layout/MainLayout';

export const metadata = {
  title: 'Profile | BITians',
  description: 'Your profile on BITians social media platform',
};

export default function ProfilePage() {
  return (
    <MainLayout>
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
          <p>This page is under construction.</p>
        </div>
      </div>
    </MainLayout>
  );
}
