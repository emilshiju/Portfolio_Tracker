

"use client"




import * as React from "react";
import { useEffect ,useState} from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { getAllStockApi } from "../lib/api_service_client/portfolioHandler";

import { StockType } from "../types/component_type/component_type";
import ShowTableContainer from "../components/ShowTableContainer";







// Create a column helper to ensure type safety
const columnHelper = createColumnHelper<StockType>();

// Define columns for the table
const columns = [
  columnHelper.accessor("particulars", {
    header: "particulars",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("purchasePrice", {
    header: "purchasePrice",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("quantity", {
    header: "quantity",
    cell: (info) => info.getValue(),
  }),
   columnHelper.accessor("exchange", {
    header: "exchange",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("sectorId", {
    header: "sectorId",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("portfolioId", {
    header: "portfolioId",
    cell: (info) => info.getValue(),
  }),
];





export default function App() {


  
// const [allData, setData] = useState<StockType[]>([]);



//   const table = useReactTable({
//     data: allData,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });



//   const fetchAllStock=async()=>{

//     const allStock=await  getAllStockApi()
//     if(allStock?.success){
//       setData(allStock.data)
//     }
    

//   }

//   useEffect(()=>{
//    fetchAllStock()
//   },[])

  

  return (
    <><ShowTableContainer /></>
    // <div className="p-8">
    //   <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
    //     <thead className="bg-gray-100">
    //       {table.getHeaderGroups().map((headerGroup) => (
    //         <tr key={headerGroup.id}>
    //           {headerGroup.headers.map((header) => (
    //             <th
    //               key={header.id}
    //               className="border-b border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold"
    //             >
    //               {flexRender(header.column.columnDef.header, header.getContext())}
    //             </th>
    //           ))}
    //         </tr>
    //       ))}
    //     </thead>
    //     <tbody>
    //       {table.getRowModel().rows.map((row) => (
    //         <tr
    //           key={row.id}
    //           className="even:bg-gray-50 hover:bg-gray-100 transition-colors"
    //         >
    //           {row.getVisibleCells().map((cell) => (
    //             <td key={cell.id} className="border-b border-gray-200 px-4 py-2">
    //               {flexRender(cell.column.columnDef.cell, cell.getContext())}
    //             </td>
    //           ))}
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  );
}
