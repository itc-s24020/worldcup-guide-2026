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
 * Next.js Image を使用した最適化された画像コンポーネント
 * 高品質表示とエラーハンドリングに対応
 */
export function AppImage({
  src,
  alt,
  className,
  placeholderText,
  width = 400,
  height = 300,
  priority = false,
  quality = 95,
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

  // ヒーロー画像は最高品質、それ以外は95
  const imageQuality = isHero ? 100 : quality;

  // ★ microCMS 画像 URL を超高解像度化
  let optimizedSrc = displaySrc;

  if (displaySrc.includes("microcms-assets.io")) {
    // ヒーロー画像用: 最高品質設定
    if (isHero) {
      optimizedSrc = `${displaySrc}?auto=compress&fit=max&w=2560&h=1440&q=100&sharp=3&fm=webp`;
    } else {
      // 通常画像用
      optimizedSrc = `${displaySrc}?auto=compress&fit=max&w=${Math.max(
        width || 400,
        1920
      )}&h=${Math.max(height || 300, 1080)}&q=95&sharp=2&fm=webp`;
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
    />
  );
}
