import "../lib/db/models/sector"; 
import "../lib/db/models/stock"; 
import stock from "../lib/db/models/stock"
import dbConnect  from "../lib/db/mongodb"
import { GroupedStocksBySector } from "../types/controller_type/controller_type";




export async function getAll(){

    try{

        console.log("first")
        await dbConnect()

         
        const allStocks = await stock.find().populate("sectorId", "name", "Sector");

    
        const groupedBySector:GroupedStocksBySector= {};


    allStocks.forEach((stock) => {

      const sectorName = stock.sectorId?.name || "Uncategorized";

      if (!groupedBySector[sectorName]) {
        groupedBySector[sectorName] = [];
      }

      
      const {  particulars, purchasePrice, quantity, exchange, createdAt } = stock;

  groupedBySector[sectorName].push({
    particulars,
    purchasePrice,
    quantity,
    exchange,
    createdAt,
  });


    });

    console.log("all data",groupedBySector)

    return groupedBySector;




    }catch(error){
        console.log("error occured in the getAll Controller",error)
        return false
    }
}