// ★ 必須: クライアントコンポーネントとして指定
"use client";

import { useState } from "react";

type Props = {
  src?: string;
  alt: string;
  className: string;
  placeholderText?: string; // プレースホルダーのテキストを動的に
};

/**
 * フォールバック機能付きの画像コンポーネント (クライアント)
 */
export function AppImage({ src, alt, className, placeholderText }: Props) {
  // placehold.co のURLを生成
  const getPlaceholderUrl = () => {
    const text = encodeURIComponent(placeholderText || alt);
    // クラス名からサイズを推定しようと試みる (簡易的)
    // 実際には width/height をpropsで渡すのが最善です
    let size = "400x300";
    if (className.includes("playerPhoto")) size = "200x200";
    if (className.includes("playerImage")) size = "80x80";

    return `https://placehold.co/${size}/1a1a1a/888888?text=${text}`;
  };

  const [imageSrc, setImageSrc] = useState(src || getPlaceholderUrl());

  // onError イベントハンドラ
  const handleError = () => {
    setImageSrc(getPlaceholderUrl());
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={handleError} // クライアントコンポーネントなのでOK
    />
  );
}
