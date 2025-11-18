/** @type {import('next').NextConfig} */
const nextConfig = {
  // 画像最適化設定
  images: {
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

    // 高品質フォーマット - WebP を優先（高速化）
    formats: ["image/webp"],

    // デバイス別サイズ最適化
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],

    // 画像サイズ最適化
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // 品質レベル設定（バランス重視）
    // ★ 修正: 90 を追加
    qualities: [75, 85, 90, 95],

    // キャッシュ設定（1年）
    minimumCacheTTL: 60 * 60 * 24 * 365,

    // Vercelの最適化を有効
    unoptimized: false,
  },

  // ★ 高速化設定
  compress: true,
  // ★ 削除: swcMinify は Next.js 16 では不要（デフォルトで SWC を使用）
  poweredByHeader: false,

  // React 最適化
  reactStrictMode: true,

  // キャッシュ設定
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },

  // ビルド最適化
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["lodash-es", "date-fns"],
  },
};

export default nextConfig;
