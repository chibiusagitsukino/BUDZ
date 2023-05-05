/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.pexels.photos"],
    unoptimized: true,
  },
  trailingSlash: true,
  env: {
    PUBLIC_URL: "/",
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: ["src/styles"],
    prependData: `@import "./src/styles/variables/all.scss";`,
  },
};

module.exports = nextConfig;
