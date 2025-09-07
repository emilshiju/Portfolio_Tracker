



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

// Using Record to allow any sector name dynamically
export type PortfolioData = Record<string, allSector>;
