import { getPlayerDetail } from "@/lib/microcms";
import type { Player } from "@/lib/microcms";
import Link from "next/link";
import styles from "./page.module.css";
import countryStyles from "@/app/countries/[id]/page.module.css";
import { AppImage } from "@/app/components/AppImage";
import React from "react";
import { RichHtmlContent } from "@/app/components/RichHtmlContent";
import { Breadcrumbs, BreadcrumbItem } from "@/app/components/Breadcrumbs";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PlayerDetailPage(props: Props) {
  const params = await props.params;
  const player: Player = await getPlayerDetail(params.id, { depth: 1 });

  const countryName = player.country?.name || "不明な国";
  const countryId = player.country?.id;

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem href="/">ホーム</BreadcrumbItem>
        {countryId ? (
          <BreadcrumbItem href={`/countries/${countryId}`}>
            {countryName}
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem>{countryName}</BreadcrumbItem>
        )}
        <BreadcrumbItem isCurrent={true}>{player.name}</BreadcrumbItem>
      </Breadcrumbs>

      <div className={styles.playerDetailContainer}>
        <div className={countryStyles.section}>
          <div className={styles.layoutContainer}>
            <div className={styles.photoContainer}>
              <AppImage
                src={player.photo?.url || ""}
                alt={`${player.name} 選手`}
                width={224}
                height={224}
                className={styles.playerPhoto}
              />
            </div>

            <div className={styles.infoContainer}>
              <span className={styles.playerPosition}>{player.position}</span>
              <h1 className={styles.playerName}>{player.name}</h1>

              <div className={styles.infoRow}>
                <strong>所属クラブ:</strong>
                <span>{player.club}</span>
              </div>

              <div className={styles.infoRow}>
                <strong>所属国:</strong>
                {countryId ? (
                  <Link
                    href={`/countries/${countryId}`}
                    className={styles.countryLink}
                  >
                    {countryName}
                  </Link>
                ) : (
                  <span>{countryName}</span>
                )}
              </div>

              <h3 className={styles.sectionTitle}>選手紹介I</h3>
              <RichHtmlContent htmlContent={player.description} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
