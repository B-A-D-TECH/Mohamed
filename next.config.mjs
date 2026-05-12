/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Activer les optimisations image de Next (format moderne, tailles adaptées, etc.)
  images: {
    unoptimized: false,
  },
}


export default nextConfig
