'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

export default function Navbar() {
  const { status, data } = useSession();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsPopupVisible(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    if (!isPopupVisible) {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isPopupVisible]);

  return (
    <nav className="flex justify-between pb-4 border-b mb-4 relative">
      <div>
        <Link href="/">
          <h1 className="text-4xl font-bold tracking-tighter text-dark">
            CodeLatest
          </h1>
        </Link>
        <p className="text-sm">
          Exploring Tomorrow&apos;s Innovation, <br /> One Byte at a Time
        </p>
      </div>
      {status === 'authenticated' ? (
        <>
          <div
            ref={popupRef}
            className={`absolute z-30 right-0 top-20 bg-white p-6 shadow-lg rounded-md flex-col gap-2 text-right min-w-[160px] ${
              isPopupVisible ? 'flex' : 'hidden'
            }`}
          >
            <h5 className="font-bold text-xl">{data?.user?.name}</h5>
            <h6 className="text-md">{data?.user?.email}</h6>
            <Link className="hover:underline" href={'/dashboard'}>
              Dashboard
            </Link>
            <Link className="hover:underline" href={'/create-post'}>
              Create Post
            </Link>
            <button className="btn" onClick={() => signOut()}>
              Sign Out
            </button>
          </div>
          <div className="flex gap-4 items-center">
            <Link className="hidden md:flex gap-2 mr-6" href={'/create-post'}>
              <span>
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
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </span>
              <span>Create New</span>
            </Link>
            <Image
              src={data?.user?.image || ''}
              alt="Profile Image"
              height={36}
              width={36}
              priority
              className="rounded-full cursor-pointer"
              onClick={() => setIsPopupVisible((prev) => !prev)}
            />
          </div>
        </>
      ) : (
        <div className="flex items-center">
          <Link className="btn" href="/sign-in">
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
}
