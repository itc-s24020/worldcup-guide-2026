import Link from "next/link";
import { getCountries } from "@/lib/microcms";
import styles from "./page.module.css";
// ★ インポート
import { AppImage } from "@/app/components/AppImage";

// メインのページコンポーネント (サーバーコンポーネント)
export default async function HomePage() {
  const { contents: countries } = await getCountries({
    limit: 50,
    orders: "fifa_rank", // FIFAランク順で並び替え
  });

  return (
    <div>
      <h2 className={styles.pageTitle}>W杯注目国一覧</h2>
      <div className={styles.grid}>
        {countries.map((country) => (
          <Link
            href={`/countries/${country.id}`}
            key={country.id}
            className={styles.card}
          >
            <div className={styles.cardImageContainer}>
              <AppImage
                src={country.flag?.url}
                alt={`${country.name} 国旗`}
                className={styles.cardImage}
                placeholderText={country.name} // プレースホルダー用テキスト
              />
              <span className={styles.cardBadge}>{country.region}</span>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{country.name}</h3>
              <p className={styles.cardRank}>
                FIFAランク:{" "}
                <span className={styles.cardRankValue}>
                  {country.fifa_rank}位
                </span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
