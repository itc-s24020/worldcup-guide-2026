/** @type {import('next').NextConfig} */
const nextConfig = {
  // microCMSの画像ドメインを許可します
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
        port: "",
        pathname: "/**",
      },
      // フォールバック用のプレースホルダー画像ドメイン
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
