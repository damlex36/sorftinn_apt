/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Add allowed qualities to fix the warning
    qualities: [70, 75, 80, 85, 90], // 👈 ADD THIS LINE
    
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/media/**',
      },
    ],
    // Keep your local IP setting
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;