



export interface stockDetails {
  [key: string]: string;
}


export interface StockSummary {
  particulars: string;
  exchange: string;
  purchasePrice: number;
  quantity: number;
  investment: number;
  portfolioPct:number|string
  presentValue: number | string;
  gainLoss: number | string;
  cmp: number | string;
  peRatio: number | string;
  latestEarnings: number | string;
}



export interface StockWithSectorType {
  particulars: string;
  purchasePrice: number;
  quantity: number;
  exchange: string;
  createdAt: Date;
}

export type GroupedStocksBySector = Record<string, StockWithSectorType[]>;













export interface SectorSummary {
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
  portfolioRatio: number;
}

export interface allSector {
  stocks: StockSummary[];
  summary: SectorSummary;
}


export type PortfolioData = Record<string, allSector>;
