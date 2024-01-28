import Image from 'next/image';
import Link from 'next/link';
import DeleteButton from '@/components/DeleteButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]';

interface PostProps {
  id: string;
  author: string;
  date: string;
  thumbnail?: string;
  authorEmail?: string;
  title: string;
  content: string;
  links: string[];
  category?: string;
}

export default async function Post({
  id,
  author,
  date,
  thumbnail,
  authorEmail,
  title,
  content,
  links,
  category,
}: PostProps) {
  const session = await getServerSession(authOptions);
  const isEditable = session && session?.user?.email === authorEmail;

  const dateObject = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };

  const formattedDate = dateObject.toLocaleDateString('en-US', options);

  return (
    <section className="my-4 border-b-2 py-8">
      <div className="mb-4">
        {author ? (
          <>
            Posted By: <span className="font-bold">{author} </span>
            on {formattedDate}
          </>
        ) : (
          <>Posted On {formattedDate}</>
        )}
      </div>
      <div className="w-full h-72 relative">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            priority
            className="object-cover object-center rounded-md"
          />
        ) : (
          <Image
            src={'/thumbnail-placeholder.png'}
            alt={title}
            fill
            priority
            sizes=""
            className="object-cover object-center rounded-md"
          />
        )}
      </div>

      {category && (
        <Link
          className="bg-slate-800 text-white rounded-md text-sm font-bold mt-4 block w-fit px-4 py-0.5"
          href={`categories/${category}`}
        >
          {category}
        </Link>
      )}
      <h2>{title}</h2>
      <p className="content">{content}</p>

      {links && (
        <div className="my-4">
          {links.map((link, i) => (
            <div key={i} className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                />
              </svg>

              <Link className="link" href={link}>
                {link}
              </Link>
            </div>
          ))}
        </div>
      )}

      {isEditable && (
        <div className="bg-slate-200 font-bold py-2 px-4 rounded-md w-fit flex gap-5">
          <Link href={`/edit-post/${id}`}>Edit</Link>
          <DeleteButton id={id} />
        </div>
      )}
    </section>
  );
}
