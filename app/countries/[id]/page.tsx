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
  const country: Country = await getCountryDetail(params.id);

  const { contents: players } = await getPlayers({
    limit: 50,
    filters: `country[equals]${country.id}`,
    depth: 0,
  });

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem href="/">ホーム</BreadcrumbItem>
        <BreadcrumbItem isCurrent={true}>{country.name}</BreadcrumbItem>
      </Breadcrumbs>

      {/* ★ ヒーロー: 国旗とテキストが左下に固定 */}
      <div className={styles.heroContainer}>
        {/* 背景画像 - 高品質設定 */}
        <div className={styles.heroImage}>
          <AppImage
            src={country.team_photo?.url || ""}
            alt={`${country.name} チーム写真`}
            width={1920}
            height={1080}
            className={styles.heroImageTag}
            priority={true}
            quality={100}
            isHero={true}
          />
        </div>

        {/* グラデーション背景 */}
        <div className={styles.heroOverlay}></div>

        {/* コンテンツ: 国旗 + テキスト (左下に固定) */}
        <div className={styles.heroContent}>
          {/* 国旗 */}
          <AppImage
            src={country.flag?.url || ""}
            alt={`${country.name} 国旗`}
            width={120}
            height={75}
            className={styles.heroFlag}
            priority={true}
            quality={95}
          />

          {/* テキスト: 国名 + FIFAランク */}
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
