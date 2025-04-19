import MainLayout from '../../components/layout/MainLayout';

export const metadata = {
  title: 'Search | BITians',
  description: 'Search for users, posts, and content on BITians',
};

export default function SearchPage() {
  return (
    <MainLayout>
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Search Page</h1>
          <p>This page is under construction.</p>
        </div>
      </div>
    </MainLayout>
  );
}
