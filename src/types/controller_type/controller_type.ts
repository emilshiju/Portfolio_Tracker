



export interface stockDetails {
  [key: string]: string;
}


export interface StockSummary {
  particulars: string;
  exchange: string;
  purchasePrice: number;
  quantity: number;
  investment: number;
  portfolio:number|string
  presentValue: number | string;
  gainLoss: number | string;
  currentPrice: number | string;
  peRatio: number | string;
  latestEarnings: number | string;
}