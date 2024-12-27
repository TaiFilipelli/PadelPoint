/** @type {import('next').NextConfig} */
const nextConfig = {

    removeConsole: process.env.NODE_ENV === "PROD",

    images:{
        unoptimized: true,
    },

    experimental:{
        missingSuspenseWithCSRBailout: false,
    }
};
export default nextConfig;