"use client"; // ★ クライアントコンポーネント

import React from "react";
import Link from "next/link";
import type { Player } from "@/lib/microcms";
import styles from "./PlayerCard.module.css";
import { AppImage } from "@/app/components/AppImage";

/**
 * 選手カードコンポーネント
 */
export function PlayerCard({
  player,
  priority = false,
}: {
  player: Player;
  priority?: boolean;
}) {
  return (
    <Link href={`/players/${player.id}`} className={styles.playerCard}>
      <div className={styles.playerCardImageContainer}>
        <AppImage
          src={player.photo?.url || ""}
          alt={`${player.name} 選手`}
          width={300}
          height={400}
          className={styles.playerCardImage}
          isPlayer={true}
          priority={priority}
        />
      </div>
      <div className={styles.playerCardInfo}>
        <span className={styles.playerCardName}>{player.name}</span>
        <span className={styles.playerCardClub}>{player.club}</span>
      </div>
    </Link>
  );
}
