import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className='flex justify-between pb-4 border-b mb-4'>
      <div>
        <Link href='/'>
          <h1 className='text-4xl font-bold tracking-tighter text-dark'>
            RanaDev
          </h1>
        </Link>
        <p className='text-sm'>
          Exploring Tomorrow&apos;s Innovation, <br /> One Byte at a Time
        </p>
      </div>
      <div className='flex items-center'>
        <Link className='btn' href='/signin'>
          Sign In
        </Link>
      </div>
    </nav>
  );
}
