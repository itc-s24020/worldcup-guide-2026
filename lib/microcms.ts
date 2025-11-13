import { createClient } from "microcms-js-sdk";
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSContentId,
  MicroCMSListContent,
} from "microcms-js-sdk";

// --- 型定義 (スキーマに対応) ---

// 画像
export type Image = MicroCMSImage;

// 国 (countries)
export interface Country extends MicroCMSListContent {
  name: string;
  flag?: Image;
  team_photo?: Image;
  region: string;
  fifa_rank: number;
  description: string; // リッチエディタ (HTML)
}

// 選手 (players)
export interface Player extends MicroCMSListContent {
  name: string;
  photo?: Image;
  country: Country; // コンテンツ参照 (単一)
  position: string;
  club: string;
  description: string; // リッチエディタ (HTML)
}

// --- クライアント設定 ---

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}
if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// --- データ取得関数 ---

/**
 * 国一覧を取得
 */
export const getCountries = (queries?: MicroCMSQueries) => {
  return client.getList<Country>({
    endpoint: "countries",
    queries,
  });
};

/**
 * 国を1件取得
 */
export const getCountryDetail = (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return client.getListDetail<Country>({
    endpoint: "countries",
    contentId,
    queries,
  });
};

/**
 * 選手一覧を取得 (国で絞り込み可能)
 */
export const getPlayers = (queries?: MicroCMSQueries) => {
  return client.getList<Player>({
    endpoint: "players",
    queries,
  });
};

/**
 * 選手を1件取得
 */
export const getPlayerDetail = (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return client.getListDetail<Player>({
    endpoint: "players",
    contentId,
    queries,
  });
};
