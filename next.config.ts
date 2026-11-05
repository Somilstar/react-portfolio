import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Send the old Vercel address to the custom domain so search engines index one site.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "somilarora-portfolio.vercel.app" }],
        destination: "https://www.somilarora.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
