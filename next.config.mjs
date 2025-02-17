/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dakshhousing.com",
        pathname: "/satsambhav/uploads/puja/**", // Allow all images in this directory
      },
    ],
  },
};

export default nextConfig;
