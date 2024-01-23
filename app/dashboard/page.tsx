import { postsData } from '@/data';
import Post from '@/components/Post';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div>
      <h1>My Posts</h1>
      {postsData && postsData.length > 0 ? (
        postsData.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            author={post.author}
            authorEmail={'test@gmail.com'}
            date={post.datepublished}
            thumbnail={post.thumbnail}
            category={post.category}
            title={post.title}
            content={post.content}
            links={post.links || []}
          />
        ))
      ) : (
        <div className='py-6'>
          No posts to display.{' '}
          <Link className='underline' href={'/create-new'}>
            Create New
          </Link>
        </div>
      )}
    </div>
  );
}
