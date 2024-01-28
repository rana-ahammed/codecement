import CreatePostForm from '@/components/CreatePostForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function CreatePost() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect('/sign-in');
  }
  return <CreatePostForm />;
}
