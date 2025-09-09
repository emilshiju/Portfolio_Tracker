import { getGoogleFinanceData } from "../service/googleFinance";
import { getStockPrice } from "../service/yahooFinance";

import {
  GroupedStocksBySector,
  PortfolioData,
} from "../types/controller_type/controller_type";

export async function allMarketData(
  data: GroupedStocksBySector
): Promise<PortfolioData | boolean> {
  try {
    const sectorResults: PortfolioData = {};
    let totalPortfolioInvestment = 0;

    // First pass: Calculate total portfolio investment
    for (const sector in data) {
      const stocks = data[sector];
      for (const stock of stocks) {
        totalPortfolioInvestment += stock.purchasePrice * stock.quantity;
      }
    }

    // Process each sector
    for (const sector in data) {
      const stocks = data[sector];
      let sectorInvestment = 0;
      let sectorPresentValue = 0;
      let sectorGainLoss = 0;

      sectorResults[sector] = {
        stocks: [],
        summary: {
          totalInvestment: 0,
          totalPresentValue: 0,
          totalGainLoss: 0,
          portfolioRatio: 0,
        },
      };

      // Process each stock in the sector
      for (const stock of stocks) {
        const { particulars, exchange, purchasePrice, quantity } = stock;

        const [cmp, googleData] = await Promise.all([
          getStockPrice(particulars, exchange),
          getGoogleFinanceData(particulars, exchange),
        ]);

        const investment = purchasePrice * quantity;
        sectorInvestment += investment;

        let presentValue: number | string = "N/A";
        let gainLoss: number | string = "N/A";

        const currentPrice: number | string = cmp?.currentPrice ?? "N/A";

        let portfolioPct: number | string = "N/A";

        if (typeof cmp.currentPrice === "number") {
          presentValue = cmp.currentPrice * quantity;
          gainLoss = presentValue - investment;
          sectorPresentValue += presentValue;
          sectorGainLoss += gainLoss;
          portfolioPct = Number(
            ((investment / totalPortfolioInvestment) * 100).toFixed(2)
          );
        }

        // Add to sector results with all required fields
        sectorResults[sector].stocks.push({
          particulars,
          purchasePrice,
          quantity,
          investment: purchasePrice * quantity,
          portfolioPct,
          exchange: exchange,
          cmp: currentPrice,
          presentValue,
          gainLoss,
          peRatio: googleData?.peRatio,
          latestEarnings: googleData?.latestEarnings,
        });
      }

      sectorResults[sector].summary = {
        totalInvestment: sectorInvestment,
        totalPresentValue: sectorPresentValue,
        totalGainLoss: sectorGainLoss,
        portfolioRatio: Number(
          ((sectorInvestment / totalPortfolioInvestment) * 100).toFixed(2)
        ),
      };
    }

    return sectorResults;
  } catch (error) {
    console.error("Error fetching stock data:", error);

    return false;
  }
}
