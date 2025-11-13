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
};

/**
 * Next.js Image を使用した最適化された画像コンポーネント
 */
export function AppImage({
  src,
  alt,
  className,
  placeholderText,
  width = 400,
  height = 300,
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

  return (
    <Image
      src={displaySrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      onError={handleError}
      priority={false}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    />
  );
}
