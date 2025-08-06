/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sweekarme.in',
        port: '',
        pathname: '/media/**', 
      },
    ],
  },
};

export default nextConfig;