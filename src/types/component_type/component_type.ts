import { Types } from "mongoose";

import {
  ColumnDef,
  GroupColumnDef
} from "@tanstack/react-table"
import { StockSummary } from "../controller_type/controller_type";



export interface  StockType {
  particulars: string;
  purchasePrice: number;
  quantity: number;
  exchange: string;
  sectorId: Types.ObjectId;
  portfolioId: Types.ObjectId;
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
