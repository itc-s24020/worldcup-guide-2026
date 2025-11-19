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
            {/* ★ 左側: 選手写真 + 名前 */}
            <div className={styles.photoContainer}>
              <div className={styles.photoWrapper}>
                <AppImage
                  src={player.photo?.url || ""}
                  alt={`${player.name} 選手`}
                  width={280}
                  height={360}
                  className={styles.playerPhoto}
                  isPlayer={true}
                  priority={true} // ★ 優先度設定
                />
                {/* ★ 改善: 名前をセンター配置 */}
                <div className={styles.photoNameOverlay}>
                  <h2 className={styles.photoName}>{player.name}</h2>
                </div>
              </div>
            </div>

            {/* ★ 右側: 情報 */}
            <div className={styles.infoContainer}>
              <span className={styles.playerPosition}>{player.position}</span>

              <div className={styles.infoRow}>
                <strong>所属クラブ:</strong>
                <span>{player.club}</span>
              </div>

              <h3 className={styles.sectionTitle}>選手紹介</h3>
              <RichHtmlContent htmlContent={player.description} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
