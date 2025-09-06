// import axios from "axios";
// import * as cheerio from "cheerio";



// export async function getGoogleFinanceData(ticker: string, exchange: string) {
//   try {
//     const url = `https://www.google.com/finance/quote/${ticker}:${exchange}`;
//     const { data } = await axios.get(url);

//     const $ = cheerio.load(data);

//     // P/E Ratio (div with class "P6K39c" after label "P/E ratio")
//     let peRatio: string | null = null;
//     $("div.gyFHrc").each((_, el) => {
//       const label = $(el).find("div.mfs7Fc").text().trim();
//       if (label === "P/E ratio") {
//         peRatio = $(el).find("div.P6K39c").text().trim();
//       }
//     });

//     // EPS (td with class "QXDnM" after label "Earnings per share")
//     let eps: string | null = null;
//     $("tr.roXhBd").each((_, el) => {
//       const label = $(el).find("div.rsPbEe").text().trim();
//       if (label === "Earnings per share") {
//         eps = $(el).find("td.QXDnM").first().text().trim();
//       }
//     });

//     return { ticker, peRatio, eps };
//   } catch (error) {
//     console.error("Error fetching Google Finance data:", error);
//     return null;
//   }
// }

// // Example usage
// (async () => {
//   const result = await getGoogleFinanceData("ICICIBANK", "NSE");
//   console.log(result);
// })();




import axios from "axios";
import * as cheerio from "cheerio";

export async function getGoogleFinanceData(ticker: string, exchange: string) {
  try {
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

    // Always return an object with the same keys
    return {
      ticker,
      exchange,
      peRatio: peRatio || "N/A",
      latestEarnings: eps || "N/A",
    };
  } catch (error) {
    console.error(`Error fetching Google Finance data for ${ticker}:`, error);

    
    return {
      ticker,
      exchange,
      peRatio: "N/A",
      latestEarnings: "N/A",
    };
  }
}

// Example usage
(async () => {
  const result = await getGoogleFinanceData("ICICIBANK", "NSE");
  console.log(result);
})();
