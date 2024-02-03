'use client';

import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ id }: { id: string }) {
  const deleteImage = async (publicId: string) => {
    const res = await fetch('/api/removeImage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ publicId }),
    });
  };

  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this post?'
    );

    if (confirmed) {
      try {
        const res = await fetch(`/api/posts/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
          },
        });

        if (res.ok) {
          toast.success('Post has been deleted');
          const post = await res.json();
          const { publicId } = post;
          await deleteImage(publicId);
          router.refresh();
        }
      } catch (error) {
        toast.error('Something went wrong');
        console.log(error);
      }
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-800">
      Delete
    </button>
  );
}
