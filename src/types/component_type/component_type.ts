import { Types } from "mongoose";

import {
  ColumnDef,
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

export interface TableRowOne {

   isSector: boolean
  sectorName: string

  // Sector summary fields
  totalInvestment?: number
  totalPresentValue?: number
  totalGainLoss?: number
  portfolioRatio?: number

  // Stock fields
  particulars?: string
  purchasePrice?: number
  quantity?: number
  investment?: number
  portfolioPct?: number
  exchange?: string
  cmp?: number
  presentValue?: number
  gainLoss?: number
  peRatio?: number
  latestEarnings?: string


}
