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

      <div className={styles.heroContainer}>
        <AppImage
          src={country.team_photo?.url || ""}
          alt={`${country.name} チーム`}
          width={1200}
          height={630}
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay}>
          <AppImage
            src={country.flag?.url || ""}
            alt={`${country.name} 国旗`}
            width={120}
            height={80}
            className={styles.heroFlag}
          />
          <h1 className={styles.heroTitle}>{country.name}</h1>
          <span className={styles.heroRank}>
            FIFAランク: {country.fifa_rank}位
          </span>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>国の詳細</h3>
        <RichHtmlContent htmlContent={country.description} />
      </div>

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
