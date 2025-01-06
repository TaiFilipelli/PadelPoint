/** @type {import('next').NextConfig} */
const nextConfig = {

    compiler: {
            removeConsole: process.env.NODE_ENV === "PROD" ? { exclude: ["error"] } : false
    },

    images:{
        unoptimized: true,
    },

    experimental:{
        missingSuspenseWithCSRBailout: false,
    }
};
export default nextConfig;