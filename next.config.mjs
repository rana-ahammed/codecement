import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const prod = process.env.NODE_ENV === 'production';

const withPWAInit = withPWA({
  dest: 'public',
  register: true,
  disable: prod ? false : true,
  skipWaiting: true,
});
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default withPWAInit(nextConfig);
