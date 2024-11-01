/** @type {import('next').NextConfig} */
const nextConfig = {

    removeConsole: process.env.NODE_ENV === "PROD",

    experimental:{
        missingSuspenseWithCSRBailout: false,
    }
};
export default nextConfig;