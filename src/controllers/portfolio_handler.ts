import sector from "../lib/db/models/sector"
import stock from "../lib/db/models/stock"
import dbConnect  from "../lib/db/mongodb"




export async function getAll(){

    try{

        console.log("first")
        await dbConnect()
        console.log("second")
        const allStocks=await stock.find()
        
   

        return allStocks




    }catch(error){
        console.log("error occured in the getAll Controller")
        return false
    }
}