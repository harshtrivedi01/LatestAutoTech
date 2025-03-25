/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['punyasetu-bucket.s3.ap-south-1.amazonaws.com','clickpanditji.com','www.srimandir.com'],
  
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dakshhousing.com",
        pathname: "/satsambhav/uploads/puja/**",
      },
    ],
  },
};

export default nextConfig;
