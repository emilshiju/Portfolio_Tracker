import { TableRowOne } from "../types/component_type/component_type"


 const flattenSectors = (allSectors: any): TableRowOne[] => {
  const rows: TableRowOne[] = []

  Object.entries(allSectors).forEach(([sectorName, sectorData]: [string, any]) => {
    // Sector summary row
    rows.push({
      isSector: true,
      sectorName,
      totalInvestment: sectorData.summary.totalInvestment,
      totalPresentValue: sectorData.summary.totalPresentValue,
      totalGainLoss: sectorData.summary.totalGainLoss,
      portfolioRatio: sectorData.summary.portfolioRatio,
    })

    // Stock rows
    sectorData.stocks.forEach((stock: any) => {
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

  return rows
}

export default flattenSectors