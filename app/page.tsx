import Link from "next/link";
import { getCountries } from "@/lib/microcms";
import styles from "./page.module.css";
import { AppImage } from "@/app/components/AppImage";

export default async function HomePage() {
  const { contents: countries } = await getCountries({
    limit: 50,
    orders: "fifa_rank",
  });

  return (
    <div>
      <div className={styles.titleSection}>
        <div className={styles.titleContent}>
          <h1 className={styles.pageTitle}>
            <span className={styles.titleEmoji}>⚽</span>
            W杯注目国一覧
          </h1>
          <p className={styles.titleSubtitle}>
            2026年FIFAワールドカップの注目国を、FIFAランキング順でご紹介します
          </p>
        </div>
      </div>

      <div className={styles.grid}>
        {countries.map((country, index) => {
          // ★ 最初の6個（3列×2行）だけpriorityを有効化
          const shouldPrioritize = index < 6;

          return (
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
                  placeholderText={country.name}
                  priority={shouldPrioritize} // ★ 条件付き優先度
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
          );
        })}
      </div>
    </div>
  );
}
