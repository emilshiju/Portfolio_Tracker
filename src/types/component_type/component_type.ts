
import {
  GroupColumnDef
} from "@tanstack/react-table"
import { allSector, StockSummary } from "../controller_type/controller_type";



export interface  StockType {
  
  particulars: string;
  purchasePrice: number;
  quantity: number;
  exchange: string;
  createdAt: Date;
}


export interface StockInfo {
  particulars: string;
  exchange: string;
  purchasePrice:number,
  quantity: number;
}


export interface TableProps<TData> {
  data:TData[],
  columns: GroupColumnDef<TData>[]
}



export type TableRow = StockType & Partial<StockSummary>;


export type newTableRow=Record<string,StockType& Partial<allSector>>

export interface finalTableRow {

   isSector: boolean
  sectorName: string

  
  totalInvestment?: number
  totalPresentValue?: number
  totalGainLoss?: number
  portfolioRatio?: number

  
  particulars?: string
  purchasePrice?: number
  quantity?: number
  investment?: number
  portfolioPct?: number|string
  exchange?: string
  cmp?: number|string
  presentValue?: number|string
  gainLoss?: number|string
  peRatio?: number|string
  latestEarnings?: number|string
  status?:boolean


}
