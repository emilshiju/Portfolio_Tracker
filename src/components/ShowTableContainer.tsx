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
import TableSkeleton from "./skeleton/TableSkeleton";



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
  {
  accessorKey: "status",
  header: "Status",
  cell: ({ row }) => {
    const value = row.original.isSector
      ? row.original.totalGainLoss
      : row.original.gainLoss;

    if (value === undefined || value === null) {
      return null;
    }

    const numericValue = Number(value);
    const isPositive = numericValue >= 0;

    return (
       <span
        className={`inline-block w-12 h-8 rounded-md ${
          isPositive ? "bg-green-500" : "bg-red-500"
        }`}
      />
    );
  },
},

],
    [columnHelper] 
  );


    const [allData, setData] = useState<newTableRow>({});

    const [tableData,setTableData]=useState<finalTableRow[]>([]);

    const [errorText, setErrorText] = useState<string | null>(null);

    const [showSkeleton,setSkeleton]=useState(false)




    const fetchLiveData = async (stocks:newTableRow) => {
    const sectorsCheck  = stocks || allData;
     const sectors = Object.keys(sectorsCheck);

    


    if (sectors.length === 0) return;

    try {


        
        const liveDataResponse = await getLiveMarketDataApi(stocks);
        
        if (liveDataResponse.success && liveDataResponse.data) {

           setErrorText(null)

           let ressData=flattenSectors(liveDataResponse.data)

  
          setTableData(ressData)
          
            
        }


        if(liveDataResponse.success==false){
           setErrorText(liveDataResponse.message)
           setData({})
           setTableData([])
        }


    } catch (error) {
        console.error("Error fetching live market data:", error);
    }
};





    
    const fetchAllStock = async () => {
        
        try {

          setSkeleton(true)

            const allStock = await getAllStockApi();

            if (allStock.success&&allStock.data) {

              setErrorText(null)


              const ressData=transformData(allStock.data)

                setData(allStock.data);
                setTableData(ressData)
               
                await fetchLiveData(allStock.data);
            }

            if(allStock.success==false){
              setErrorText(allStock.message)
            }


        } catch (error) {
            console.error("Error fetching stock data:", error);
        } finally {
           setSkeleton(false)
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
    

    

    if(showSkeleton){
      return <TableSkeleton />
    }


    return (
        <div>

         

       {tableData.length>0&&!errorText&&<DataTable columns={columns} data={tableData} />}


       {errorText && (
  <div className="bg-red-100 text-red-700 p-2 rounded-md mb-4 flex justify-between items-center">
    <span>{errorText}</span>
    <button
      className="bg-red-500 text-white px-2 py-1 rounded"
      onClick={fetchAllStock}
    >
      Retry
    </button>
  </div>
)}



            
        </div>
    )
}

export default ShowTableContainer
