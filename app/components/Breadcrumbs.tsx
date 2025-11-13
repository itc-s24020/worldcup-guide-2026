"use client"; // ★ クライアントコンポーネント

import React from "react";
import Link from "next/link";
// ★ 修正: 専用のCSSモジュールをインポート
import styles from "./Breadcrumbs.module.css";

/**
 * パンくずリストのコンテナ
 */
export function Breadcrumbs({ children }: { children: React.ReactNode }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={styles.breadcrumbsList}>{children}</ol>
    </nav>
  );
}

/**
 * パンくずリストのアイテム
 */
export function BreadcrumbItem({
  href,
  isCurrent,
  children,
}: {
  href?: string;
  isCurrent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li className={styles.breadcrumbItem}>
      {isCurrent || !href ? (
        <span aria-current={isCurrent ? "page" : undefined}>{children}</span>
      ) : (
        <Link href={href}>{children}</Link>
      )}
    </li>
  );
}
