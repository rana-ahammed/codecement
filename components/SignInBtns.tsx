'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function SignInBtns() {
  return (
    <>
      <h1 className="text-center mt-8">Sign in</h1>
      <div className="mt-4 p-4 flex flex-col gap-4 items-center justify-center">
        <button
          onClick={() => signIn('github')}
          className="flex rounded-full p-4 border gap-4 items-center hover:bg-slate-100/75 transition"
        >
          <span>
            <Image
              src={'/github-logo.svg'}
              width={30}
              height={30}
              alt="GitHub Logo"
            />
          </span>
          Sign in With GitHub
        </button>
        <button
          onClick={() => signIn('google')}
          className="flex rounded-full p-4 border gap-4 items-center hover:bg-slate-100/75 transition"
        >
          <span>
            <Image
              src={'/google-logo.svg'}
              width={30}
              height={30}
              alt="Google Logo"
            />
          </span>
          Sign in With Google
        </button>
      </div>
    </>
  );
}
