/** @type {import('next').NextConfig} */
const nextConfig = {
  // 画像最適化設定
  images: {
    // microCMSとプレースホルダーのドメイン許可
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
    ],

    // 高品質フォーマット - WebP を優先
    formats: ["image/avif", "image/webp"],

    // デバイス別サイズ最適化 - 超高解像度対応
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

    // 画像サイズ最適化
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // 品質レベル設定 - 最高品質対応
    qualities: [75, 95, 100],

    // 1年間のキャッシュ（静的ファイル向け）
    minimumCacheTTL: 60 * 60 * 24 * 365,

    // Vercelの最適化を有効
    unoptimized: false,
  },
};

export default nextConfig;
