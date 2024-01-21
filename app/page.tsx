import CategoriesList from '@/components/CategoriesList';
import Post from '@/components/Post';

export default function Home() {
  return (
    <>
      <CategoriesList />
      {<Post />}
    </>
  );
}
