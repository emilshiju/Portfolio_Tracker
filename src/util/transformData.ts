import { finalTableRow } from "../types/component_type/component_type"
import { GroupedStocksBySector, StockWithSectorType } from "../types/controller_type/controller_type"


const transformData = (backendData: GroupedStocksBySector): finalTableRow[] => {

  const rows: finalTableRow[] = []

  Object.entries(backendData).forEach(([sectorName, stocks]: [string, StockWithSectorType[]]) => {
  
    rows.push({
      isSector: true,
      sectorName,
    })

  
    stocks.forEach((stock: StockWithSectorType) => {
      rows.push({
        isSector: false,
        sectorName,
        particulars: stock.particulars,
        purchasePrice: stock.purchasePrice,
        quantity: stock.quantity,
        exchange: stock.exchange,
  
      })
    })
  })

  return rows
}


export default transformData