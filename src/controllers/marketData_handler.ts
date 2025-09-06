import dbConnect from "../lib/db/mongodb"
import { getGoogleFinanceData } from "../service/googleFinance"
import { getStockPrice } from "../service/yahooFinance"
import { stockDetails } from "../types/controller_type/controller_type"


export async function allMarketData(data:stockDetails){


    try{


        console.log("i got all the details",data)

        const stockEntries = Object.entries(data);

        

        const results = await Promise.all(
      stockEntries.map(async ([ticker, exchange]) => {
        // Fetch CMP and Google Finance data in parallel
        const [cmp, googleData] = await Promise.all([
          getStockPrice(ticker,exchange) ,// Yahoo CMP
          getGoogleFinanceData(ticker,exchange) // Google P/E + EPS
        ]);

        return {
          ticker,
          exchange,
          currentPrice: cmp,
          peRatio: googleData?.peRatio,
          latestEarnings: googleData?.latestEarnings
        };
      })
    );




     console.log("All stocks data:", results);


        
                
                



    }catch(error){
        console.log("error")
    }
}