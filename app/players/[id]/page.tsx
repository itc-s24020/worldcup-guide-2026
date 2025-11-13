import { getPlayerDetail } from "@/lib/microcms";
import type { Player } from "@/lib/microcms";
import Link from "next/link";
import styles from "./page.module.css";
// ★ 修正: 国詳細ページのCSSをエイリアスパスでインポート
import countryStyles from "@/app/countries/[id]/page.module.css";
import { AppImage } from "@/app/components/AppImage";
import React from "react"; // React.Node のために必要
import { RichHtmlContent } from "@/app/components/RichHtmlContent";
import { Breadcrumbs, BreadcrumbItem } from "@/app/components/Breadcrumbs";

// ===================================================================
// ページコンポーネント
// ===================================================================
type Props = {
  // ★ 修正: params が Promise である可能性に対応
  params: { id: string } | Promise<{ id: string }>;
};

export default async function PlayerDetailPage(props: Props) {
  // ★ 修正: props.params を await して Promise を解決
  const params = await props.params;
  const player: Player = await getPlayerDetail(params.id, { depth: 1 });

  // 国データが取得できなかった場合のフォールバック
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
        {/* ★ 修正: 'countryStyles' が正しく読み込まれる */}
        <div className={countryStyles.section}>
          <div className={styles.layoutContainer}>
            {/* 選手写真 */}
            <div className={styles.photoContainer}>
              <AppImage
                src={player.photo?.url || ""}
                alt={`${player.name} 選手`}
                width={400}
                height={400}
                className={styles.playerPhoto}
              />
            </div>

            {/* 選手情報 */}
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

              <h3 className={styles.sectionTitle}>選手紹介</h3>
              {/* RichHtmlContent は globals.css の .prose-custom でスタイリングされる */}
              <RichHtmlContent htmlContent={player.description} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
