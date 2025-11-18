import { getCountryDetail, getPlayers } from "@/lib/microcms";
import type { Country, Player } from "@/lib/microcms";
import styles from "./page.module.css";
import { AppImage } from "@/app/components/AppImage";
import React from "react";
import { RichHtmlContent } from "@/app/components/RichHtmlContent";
import { Breadcrumbs, BreadcrumbItem } from "@/app/components/Breadcrumbs";
import playerCardStyles from "@/app/components/PlayerCard.module.css";
import { PlayerCard } from "@/app/components/PlayerCard";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CountryDetailPage(props: Props) {
  const params = await props.params;

  // ★ 並列データ取得で高速化
  const [country, { contents: players }] = await Promise.all([
    getCountryDetail(params.id),
    getPlayers({
      limit: 50,
      filters: `country[equals]${params.id}`,
      depth: 0,
    }),
  ]);

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem href="/">ホーム</BreadcrumbItem>
        <BreadcrumbItem isCurrent={true}>{country.name}</BreadcrumbItem>
      </Breadcrumbs>

      {/* ★ ヒーロー: 背景画像を高速読み込み */}
      <div className={styles.heroContainer}>
        <div className={styles.heroImage}>
          <AppImage
            src={country.team_photo?.url || ""}
            alt={`${country.name} チーム写真`}
            width={1920}
            height={1080}
            className={styles.heroImageTag}
            priority={true}
            quality={90}
            isHero={true}
          />
        </div>

        <div className={styles.heroOverlay}></div>

        <div className={styles.heroContent}>
          <AppImage
            src={country.flag?.url || ""}
            alt={`${country.name} 国旗`}
            width={120}
            height={75}
            className={styles.heroFlag}
            priority={true}
            quality={85}
          />

          <div className={styles.heroInfo}>
            <h1 className={styles.heroTitle}>{country.name}</h1>
            <span className={styles.heroRank}>
              🏆 FIFAランク: {country.fifa_rank}位
            </span>
          </div>
        </div>
      </div>

      {/* 国の詳細セクション */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>国の詳細</h3>
        <RichHtmlContent htmlContent={country.description} />
      </div>

      {/* 注目選手セクション */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>注目選手</h3>
        {players.length > 0 ? (
          <div className={playerCardStyles.playerGrid}>
            {players.map((player: Player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        ) : (
          <p className={styles.noDataText}>
            この国の注目選手はまだ登録されていません。
          </p>
        )}
      </div>
    </div>
  );
}
