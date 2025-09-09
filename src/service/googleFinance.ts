import axios from "axios";
import * as cheerio from "cheerio";

// Cache setup
type GoogleFinanceCacheEntry = {
  peRatio: string;
  latestEarnings: string;
  timestamp: number;
};

const googleFinanceCache: Record<string, GoogleFinanceCacheEntry> = {};
const CACHE_TTL = 15 * 1000;

export async function getGoogleFinanceData(ticker: string, exchange: string) {
  try {
    const cacheKey = `${ticker}-${exchange}`;
    const cached = googleFinanceCache[cacheKey];

    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return {
        peRatio: cached.peRatio,
        latestEarnings: cached.latestEarnings,
      };
    }

    const url = `https://www.google.com/finance/quote/${ticker}:${exchange}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Extract P/E Ratio
    let peRatio: string | null = null;
    $("div.gyFHrc").each((_, el) => {
      const label = $(el).find("div.mfs7Fc").text().trim();
      if (label === "P/E ratio") {
        peRatio = $(el).find("div.P6K39c").text().trim();
      }
    });

    // Extract EPS (Earnings per share)
    let eps: string | null = null;
    $("tr.roXhBd").each((_, el) => {
      const label = $(el).find("div.rsPbEe").text().trim();
      if (label === "Earnings per share") {
        eps = $(el).find("td.QXDnM").first().text().trim();
      }
    });

    const result = {
      peRatio: peRatio || "N/A",
      latestEarnings: eps || "N/A",
    };

    googleFinanceCache[cacheKey] = { ...result, timestamp: Date.now() };

    return {
      peRatio: peRatio || "N/A",
      latestEarnings: eps || "N/A",
    };
  } catch (error) {
    console.error(`Error fetching Google Finance data for ${ticker}:`, error);

    return {
      peRatio: "N/A",
      latestEarnings: "N/A",
    };
  }
}
