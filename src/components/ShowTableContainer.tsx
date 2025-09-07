import { StockType } from "../types/component_type/component_type";
import DataTable from "./DataTable"
import { useEffect ,useState,useMemo} from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { getAllStockApi } from "../lib/api_service_client/portfolioHandler";



const ShowTableContainer=()=>{

    // Create a column helper to ensure type safety
    const columnHelper = createColumnHelper<StockType>();
    
    // Define columns for the table
    // const columns = [
    //   columnHelper.accessor("particulars", {
    //     header: "particulars",
    //     cell: (info) => info.getValue(),
    //   }),
    //   columnHelper.accessor("purchasePrice", {
    //     header: "purchasePrice",
    //     cell: (info) => info.getValue(),
    //   }),
    //   columnHelper.accessor("quantity", {
    //     header: "quantity",
    //     cell: (info) => info.getValue(),
    //   }),
    //    columnHelper.accessor("exchange", {
    //     header: "exchange",
    //     cell: (info) => info.getValue(),
    //   }),
      
    // ];
    


    const columns = useMemo(
    () => [
      // Create a header group for stock details
      columnHelper.group({
        id: "stock_details",
        header: () => <span>Stock Details</span>,
        // Define all columns within this group
        columns: [
          columnHelper.accessor("particulars", {
            header: "Particulars",
            cell: (info) => info.getValue(),
          }),
          columnHelper.accessor("purchasePrice", {
            header: "Purchase Price",
            cell: (info) => info.getValue(),
          }),
          columnHelper.accessor("quantity", {
            header: "Quantity",
            cell: (info) => info.getValue(),
          }),
          columnHelper.accessor("exchange", {
            header: "Exchange",
            cell: (info) => info.getValue(),
          }),
        ],
      }),
      // You can create additional groups if needed
      // For example, if you had more fields:
      /*
      columnHelper.group({
        id: "additional_info",
        header: () => <span>Additional Info</span>,
        columns: [
          columnHelper.accessor("sectorId", {
            header: "Sector ID",
            cell: (info) => info.getValue().toString(),
          }),
          columnHelper.accessor("portfolioId", {
            header: "Portfolio ID",
            cell: (info) => info.getValue().toString(),
          }),
        ],
      }),
      */
    ],
    [columnHelper] // Add columnHelper to dependency array
  );


    const [allData, setData] = useState<StockType[]>([]);
    
    
    
     
    
      const fetchAllStock=async()=>{
    
        const allStock=await  getAllStockApi()
        if(allStock?.success){
          setData(allStock.data)
        }
        
    
      }
    
      useEffect(()=>{
       fetchAllStock()
      },[])
    

    



    return (

        <div>

            {allData && <DataTable columns={columns} data={allData} />}

        </div>
    )
}

export default ShowTableContainer