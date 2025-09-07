import { newTableRow, StockInfo, StockType, TableRow, TableRowOne } from "../types/component_type/component_type";
import DataTable from "./DataTable"
import { useEffect ,useState,useMemo} from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { getAllStockApi, getLiveMarketDataApi } from "../lib/api_service_client/portfolioHandler";
import { StockSummary } from "../types/controller_type/controller_type";
import transformData from "../util/transformData";
import flattenSectors from "../util/formatters";



const ShowTableContainer=()=>{

    
    const columnHelper = createColumnHelper<TableRowOne>();
    
    


    const columns = useMemo(
    () => [
  {
    accessorKey: "sectorName",
    header: "Sector / Stock",
    cell: ({ row }:any) =>
      row.original.isSector
        ? <strong>{row.original.sectorName}</strong>
        : row.original.particulars ?? "Loading...",
  },
  {
    accessorKey: "investment",
    header: "Investment",
    cell: ({ row }) =>
      row.original.isSector
        ? row.original.totalInvestment
        : (row.original.investment ?? "Loading..."),
  },
  {
    accessorKey: "presentValue",
    header: "Present Value",
    cell: ({ row }) =>
      row.original.isSector
        ? row.original.totalPresentValue
        : (row.original.presentValue ?? "Loading..."),
  },
  {
    accessorKey: "gainLoss",
    header: "Gain / Loss",
    cell: ({ row }) =>
      row.original.isSector
        ? row.original.totalGainLoss
        : (row.original.gainLoss ?? "Loading..."),
  },
  {
    accessorKey: "portfolioPct",
    header: "Portfolio (%)",
    cell: ({ row }) =>
      row.original.isSector
        ? row.original.portfolioRatio
        : (row.original.portfolioPct ?? "Loading..."),
  },
  {
    accessorKey: "cmp",
    header: "CMP",
    cell: ({ row }) =>
      row.original.isSector ? null : (row.original.cmp ?? "Loading..."),
  },
  {
    accessorKey: "peRatio",
    header: "P/E",
    cell: ({ row }) =>
      row.original.isSector ? null : (row.original.peRatio ?? "Loading..."),
  },
  {
    accessorKey: "latestEarnings",
    header: "Latest Earnings",
    cell: ({ row }) =>
      row.original.isSector ? null :  (row.original.latestEarnings ?? "Loading...") ,
  },
],
    [columnHelper] 
  );


    const [allData, setData] = useState<newTableRow>({});

    const [tableData,setTableData]=useState<TableRowOne[]>([]);


    const fetchLiveData = async (stocks:newTableRow) => {
    const sectorsCheck  = stocks || allData;
     const sectors = Object.keys(stocks);

    


    if (sectors.length === 0) return;

    try {

    //       const simplifiedStocks:StockInfo[] = stocksToUpdate.map(stock => ({
    //   particulars: stock.particulars,
    //   exchange: stock.exchange,
    //   purchasePrice:stock.purchasePrice,
    //   quantity:stock.quantity
    // }));

        
        const liveDataResponse = await getLiveMarketDataApi(stocks);
        
        if (liveDataResponse.success && liveDataResponse.data) {



//           const flattenSectors = (allSectors: any): TableRowOne[] => {
//   const rows: TableRowOne[] = []

//   Object.entries(allSectors).forEach(([sectorName, sectorData]: [string, any]) => {
//     // Sector summary row
//     rows.push({
//       isSector: true,
//       sectorName,
//       totalInvestment: sectorData.summary.totalInvestment,
//       totalPresentValue: sectorData.summary.totalPresentValue,
//       totalGainLoss: sectorData.summary.totalGainLoss,
//       portfolioRatio: sectorData.summary.portfolioRatio,
//     })

//     // Stock rows
//     sectorData.stocks.forEach((stock: any) => {
//       rows.push({
//         isSector: false,
//         sectorName,
//         particulars: stock.particulars,
//         purchasePrice: stock.purchasePrice,
//         quantity: stock.quantity,
//         investment: stock.investment,
//         portfolioPct: stock.portfolioPct,
//         exchange: stock.exchange,
//         cmp: stock.cmp,
//         presentValue: stock.presentValue,
//         gainLoss: stock.gainLoss,
//         peRatio: stock.peRatio,
//         latestEarnings: stock.latestEarnings,
//       })
//     })
//   })

//   return rows
// }



           let ressData=flattenSectors(liveDataResponse.data)
          // setData(ressData)
          setTableData(ressData)
          
            
        }


    } catch (error) {
        console.error("Error fetching live market data:", error);
    }
};





    
    const fetchAllStock = async () => {
        
        try {
            const allStock = await getAllStockApi();

            if (allStock?.success) {



//               const transformData = (backendData: any): TableRowOne[] => {
//   const rows: TableRowOne[] = []

//   Object.entries(backendData).forEach(([sectorName, stocks]: [string, any]) => {
//     // Push sector row
//     rows.push({
//       isSector: true,
//       sectorName,
//     })

//     // Push stock rows
//     stocks.forEach((stock: any) => {
//       rows.push({
//         isSector: false,
//         sectorName,
//         particulars: stock.particulars,
//         purchasePrice: stock.purchasePrice,
//         quantity: stock.quantity,
//         exchange: stock.exchange,
  
//       })
//     })
//   })

//   return rows
// }



              const ressData=transformData(allStock.data)

                setData(allStock.data);
                setTableData(ressData)
               
                await fetchLiveData(allStock.data);
            }
        } catch (error) {
            console.error("Error fetching stock data:", error);
        } finally {
           
        }
    };

    


    




    useEffect(() => {
        fetchAllStock();
    }, []);

    

    useEffect(() => {

        let interval: NodeJS.Timeout | undefined; 

        // Set up interval for live data updates every 15 seconds
        const sectors = Object.keys(allData);

        if (sectors.length > 0) {
            interval = setInterval(() => {
                fetchLiveData(allData); 
            }, 15_000); 
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [tableData.length]);
    

    



    return (
        <div>

       {tableData.length&&<DataTable columns={columns} data={tableData} />}
            
        </div>
    )
}

export default ShowTableContainer
