import {  finalTableRow} from "../types/component_type/component_type"
import { allSector, PortfolioData, StockSummary } from "../types/controller_type/controller_type"


 const flattenSectors = (allSectors: PortfolioData): finalTableRow[] => {
  const rows: finalTableRow[] = []

  Object.entries(allSectors).forEach(([sectorName, sectorData]: [string, allSector]) => {
    

    rows.push({
      isSector: true,
      sectorName,
      totalInvestment: sectorData.summary.totalInvestment,
      totalPresentValue: sectorData.summary.totalPresentValue,
      totalGainLoss: sectorData.summary.totalGainLoss,
      portfolioRatio: sectorData.summary.portfolioRatio,
    })

    
    sectorData.stocks.forEach((stock: StockSummary) => {
      rows.push({
        isSector: false,
        sectorName,
        particulars: stock.particulars,
        purchasePrice: stock.purchasePrice,
        quantity: stock.quantity,
        investment: stock.investment,
        portfolioPct: stock.portfolioPct,
        exchange: stock.exchange,
        cmp: stock.cmp,
        presentValue: stock.presentValue,
        gainLoss: stock.gainLoss,
        peRatio: stock.peRatio,
        latestEarnings: stock.latestEarnings,
      })
    })
  })

  console.log("i got the full rowwwwwwwwwwwwwwwww")
  console.log(rows)

  return rows
}

export default flattenSectors