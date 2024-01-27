'use client';

export default function DeleteButton({ id }: { id: string }) {
  const handleClick = async () => {
    const confirmed = window.confirm(
      'Are you sure, you want to delete this post'
    );
    if (confirmed) {
      try {
        const res = await fetch(`/api/posts/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (res.ok) {
          console.log('Post Deleted');
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <button onClick={handleClick} className="text-red-600">
      Delete
    </button>
  );
}
