"use client"; // ★ クライアントコンポーネント

import React from "react";
import Link from "next/link";
import type { Player } from "@/lib/microcms";
// ★ 修正: 専用のCSSモジュールをインポート
import styles from "./PlayerCard.module.css";
import { AppImage } from "./AppImage";

/**
 * 選手カードコンポーネント
 */
export function PlayerCard({ player }: { player: Player }) {
  return (
    <Link href={`/players/${player.id}`} className={styles.playerCard}>
      <div className={styles.playerCardImageContainer}>
        <AppImage
          src={player.photo?.url || ""}
          alt={`${player.name} 選手`}
          // 'width' と 'height' は <Image> に必須だが、CSSで制御される
          width={200}
          height={200}
          className={styles.playerCardImage}
        />
      </div>
      <div className={styles.playerCardInfo}>
        <span className={styles.playerCardName}>{player.name}</span>
        <span className={styles.playerCardClub}>{player.club}</span>
      </div>
    </Link>
  );
}
