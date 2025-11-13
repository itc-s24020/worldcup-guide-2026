"use client"; // ★ クライアントコンポーネントとしてマーク

import React from "react";

/**
 * microCMSのリッチエディタHTMLを安全に描画するクライアントコンポーネント
 */
export function RichHtmlContent({
  htmlContent,
}: {
  htmlContent: string | undefined | null;
}) {
  // htmlContent が null や undefined の場合、空のdivを描画する
  const content = htmlContent || "";

  return (
    <div
      className="prose-custom"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
