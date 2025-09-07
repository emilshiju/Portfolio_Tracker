import { TableRowOne } from "../types/component_type/component_type"


const transformData = (backendData: any): TableRowOne[] => {
  const rows: TableRowOne[] = []

  Object.entries(backendData).forEach(([sectorName, stocks]: [string, any]) => {
    // Push sector row
    rows.push({
      isSector: true,
      sectorName,
    })

    // Push stock rows
    stocks.forEach((stock: any) => {
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