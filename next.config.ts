import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    // Career durations are prerendered; the client re-renders them against the real date after hydration.
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },
};

export default nextConfig;
