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
  isPlayer?: boolean;
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
  isPlayer = false,
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

  // ★ 修正: 画質設定の改善
  let imageQuality = quality;
  if (isHero) {
    imageQuality = 95; // ヒーロー画像は最高品質
  } else if (isPlayer) {
    imageQuality = 92; // 選手画像は高品質
  } else {
    imageQuality = 85; // その他は85
  }

  // ★ microCMS 画像 URL を最適化（高速化 + 高品質）
  let optimizedSrc = displaySrc;

  if (displaySrc.includes("microcms-assets.io")) {
    // ヒーロー画像用: 最高品質
    if (isHero) {
      optimizedSrc = `${displaySrc}?auto=compress&fit=max&w=1920&h=1080&q=95&fm=webp`;
    }
    // 選手画像用: 高品質で顔を見やすく
    else if (isPlayer) {
      const optimalWidth = Math.min(width || 400, 600);
      const optimalHeight = Math.min(height || 300, 800);
      optimizedSrc = `${displaySrc}?auto=compress&fit=max&w=${optimalWidth}&h=${optimalHeight}&q=90&fm=webp`;
    }
    // 通常画像用: バランス重視
    else {
      const optimalWidth = Math.min(width || 400, 1200);
      const optimalHeight = Math.min(height || 300, 800);
      optimizedSrc = `${displaySrc}?auto=compress&fit=max&w=${optimalWidth}&h=${optimalHeight}&q=85&fm=webp`;
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
          : isPlayer
          ? "(max-width: 640px) 100vw, (max-width: 1024px) 85vw, 80vw"
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
