import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@mrsign/content", "@mrsign/db", "@mrsign/email"],
};

export default nextConfig;
