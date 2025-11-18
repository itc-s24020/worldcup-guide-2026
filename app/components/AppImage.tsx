"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src?: string;
  alt: string;
  className: string;
  placeholderText?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  isHero?: boolean;
};

/**
 * Next.js Image を使用した高速最適化画像コンポーネント
 */
export function AppImage({
  src,
  alt,
  className,
  placeholderText,
  width = 400,
  height = 300,
  priority = false,
  quality = 85,
  isHero = false,
}: Props) {
  const [imageSrc, setImageSrc] = useState(src || "");
  const [hasError, setHasError] = useState(false);

  // プレースホルダー画像 URL
  const getPlaceholderUrl = () => {
    const text = encodeURIComponent(placeholderText || alt);
    const size = `${width}x${height}`;
    return `https://placehold.co/${size}/1a1a1a/888888?text=${text}`;
  };

  // エラー時のハンドラー
  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImageSrc(getPlaceholderUrl());
    }
  };

  // 実際の画像 URL または プレースホルダー
  const displaySrc = imageSrc || getPlaceholderUrl();

  // ★ ヒーロー画像は高品質、それ以外は85（バランス重視）
  const imageQuality = isHero ? 90 : quality;

  // ★ microCMS 画像 URL を最適化（高速化）
  let optimizedSrc = displaySrc;

  if (displaySrc.includes("microcms-assets.io")) {
    // ヒーロー画像用: 高速化＋品質バランス
    if (isHero) {
      optimizedSrc = `${displaySrc}?auto=compress&fit=max&w=1920&h=1080&q=85&fm=webp`;
    } else {
      // 通常画像用: 最適化重視
      const optimalWidth = Math.min(width || 400, 1200);
      const optimalHeight = Math.min(height || 300, 800);
      optimizedSrc = `${displaySrc}?auto=compress&fit=max&w=${optimalWidth}&h=${optimalHeight}&q=80&fm=webp`;
    }
  }

  return (
    <Image
      src={optimizedSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      onError={handleError}
      priority={priority}
      quality={imageQuality}
      sizes={
        isHero
          ? "(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
          : "(max-width: 640px) 100vw, (max-width: 1024px) 85vw, 90vw"
      }
      style={{
        objectFit: "cover",
        objectPosition: "center",
      }}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
      loading={priority ? "eager" : "lazy"}
    />
  );
}
