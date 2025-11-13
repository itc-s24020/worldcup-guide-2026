"use client";

import { useEffect, useState } from "react";

type Props = {
  htmlContent: string | undefined | null;
  className?: string;
};

export function RichHtmlContent({ htmlContent, className = "" }: Props) {
  const [decodedHtml, setDecodedHtml] = useState<string>("");

  useEffect(() => {
    if (!htmlContent) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDecodedHtml("");
      return;
    }

    const decodeHtml = (html: string): string => {
      const textarea = document.createElement("textarea");
      textarea.innerHTML = html;
      return textarea.value;
    };

    setDecodedHtml(decodeHtml(htmlContent));
  }, [htmlContent]);

  if (!decodedHtml) {
    return null;
  }

  return (
    <div
      className={`prose-custom ${className}`}
      dangerouslySetInnerHTML={{ __html: decodedHtml }}
      suppressHydrationWarning
    />
  );
}
