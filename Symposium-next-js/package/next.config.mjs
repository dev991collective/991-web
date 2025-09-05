/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    // Só precisa se você carrega imagens fora de /public.
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            { protocol: 'https', hostname: 'i.scdn.co' },
            { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
            { protocol: 'https', hostname: 'res.cloudinary.com' },
            { protocol: 'https', hostname: 'images.unsplash.com' },
        ],
    },
};


export default nextConfig;
