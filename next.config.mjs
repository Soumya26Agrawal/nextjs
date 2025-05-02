/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mystickermania.com",
      },
    ],
  },
};

export default nextConfig;
