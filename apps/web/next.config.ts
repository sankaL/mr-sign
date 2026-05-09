import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@mrsign/content", "@mrsign/db"],
};

export default nextConfig;
