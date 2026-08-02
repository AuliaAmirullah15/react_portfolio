import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next blocks /_next/* dev requests whose origin isn't localhost, so opening
  // the dev server from another device (or your own laptop via the LAN IP)
  // returns 403 for every chunk. The page still server-renders, which is why
  // the header and footer showed but the sections did not: SectionWrapper
  // starts at opacity 0 and needs JS to reveal itself.
  //
  // Dev-only — this has no effect on a production build.
  allowedDevOrigins: ["192.168.0.7", "192.168.0.*", "*.local"],
};

export default nextConfig;
