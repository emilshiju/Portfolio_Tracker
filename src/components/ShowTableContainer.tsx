import { StockInfo, StockType, TableRow } from "../types/component_type/component_type";
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



const ShowTableContainer=()=>{

    
    const columnHelper = createColumnHelper<TableRow>();
    
    


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
            cell: (info) => `₹${info.getValue()}`,
          }),
          columnHelper.accessor("quantity", {
            header: "Quantity",
            cell: (info) => info.getValue(),
          }),
          columnHelper.accessor("exchange", {
            header: "Exchange",
            cell: (info) => info.getValue(),
          }),



           columnHelper.accessor("investment", {
            header: "investment",
            cell: (info) => info.getValue() ?? "Loading...",
          }),
          columnHelper.accessor("presentValue", {
            header: "presentValue",
            cell: (info) => info.getValue() ?? "Loading...",
          }),
          columnHelper.accessor("gainLoss", {
            header: "gainLoss",
            cell: (info) => info.getValue() ?? "Loading...",
          }),

           columnHelper.accessor("currentPrice", {
            header: "currentPrice",
            cell: (info) => info.getValue() ?? "Loading...",
          }),
          columnHelper.accessor("peRatio", {
            header: "peRatio",
            cell: (info) => info.getValue() ?? "Loading...",
          }),
           columnHelper.accessor("latestEarnings", {
            header: "latestEarnings",
            cell: (info) => info.getValue() ?? "Loading...",
          }),


        ],
      }),
      
    ],
    [columnHelper] 
  );


    const [allData, setData] = useState<TableRow[]>([]);


    const fetchLiveData = async (stocks: StockType[]) => {
    const stocksToUpdate = stocks || allData;
    if (stocksToUpdate.length === 0) return;

    try {

          const simplifiedStocks:StockInfo[] = stocksToUpdate.map(stock => ({
      particulars: stock.particulars,
      exchange: stock.exchange,
      purchasePrice:stock.purchasePrice,
      quantity:stock.quantity
    }));

        
        const liveDataResponse = await getLiveMarketDataApi(simplifiedStocks);
        
        if (liveDataResponse.success && liveDataResponse.data) {

          setData(liveDataResponse.data)
          
            
        }


    } catch (error) {
        console.error("Error fetching live market data:", error);
    }
};





    
    const fetchAllStock = async () => {
        
        try {
            const allStock = await getAllStockApi();
            if (allStock?.success) {
                setData(allStock.data);
               
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
        if (allData.length > 0) {
            interval = setInterval(() => {
                fetchLiveData(allData); 
            }, 15_000); 
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [allData.length]);
    

    



    return (
        <div>

       {allData.length&&<DataTable columns={columns} data={allData} />}
            
        </div>
    )
}

export default ShowTableContainer
