import { finalTableRow, newTableRow, StockInfo, StockType, TableRow } from "../types/component_type/component_type";
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

    
    const columnHelper = createColumnHelper<finalTableRow>();
    
    

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

    const [tableData,setTableData]=useState<finalTableRow[]>([]);


    const fetchLiveData = async (stocks:newTableRow) => {
    const sectorsCheck  = stocks || allData;
     const sectors = Object.keys(sectorsCheck);

    


    if (sectors.length === 0) return;

    try {


        
        const liveDataResponse = await getLiveMarketDataApi(stocks);
        
        if (liveDataResponse.success && liveDataResponse.data) {




           let ressData=flattenSectors(liveDataResponse.data)

  
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
