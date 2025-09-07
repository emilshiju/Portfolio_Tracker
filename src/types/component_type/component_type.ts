import { Types } from "mongoose";

import {
  ColumnDef,
  GroupColumnDef
} from "@tanstack/react-table"



export interface  StockType {
  particulars: string;
  purchasePrice: number;
  quantity: number;
  exchange: string;
  sectorId: Types.ObjectId;
  portfolioId: Types.ObjectId;
  createdAt: Date;
}


export interface TableProps<TData> {
  data:TData[],
  columns: GroupColumnDef<TData>[]
}