import dbConnect from "../lib/db/mongodb"
import { getGoogleFinanceData } from "../service/googleFinance"
import { getStockPrice } from "../service/yahooFinance"
import { StockInfo } from "../types/component_type/component_type"
import { stockDetails, StockSummary } from "../types/controller_type/controller_type"


export async function allMarketData(data:StockInfo[]): Promise<StockSummary[] | boolean> {


    

    try {
    const results = await Promise.all(
      data.map(async (stock:StockInfo) => {
        const { particulars, exchange,purchasePrice,quantity } = stock;

       
        const cmp = await getStockPrice(particulars, exchange);
        const googleData = await getGoogleFinanceData(particulars, exchange);


       console.log("i got cmp",cmp.currentPrice)
       console.log("i got googleData",googleData)
        const investment = purchasePrice * quantity;       // Investment


        let presentValue: number | string = "N/A";
        let gainLoss: number | string = "N/A";


        if (typeof cmp.currentPrice === 'number') {
          presentValue= cmp.currentPrice * quantity;  
          gainLoss = presentValue - investment;    
        }         
      
        



        return {
      particulars,
      exchange,
      purchasePrice,
      quantity,
      investment,
      presentValue,
      gainLoss,
      currentPrice: cmp?.currentPrice,
      peRatio: googleData?.peRatio,
      latestEarnings: googleData?.latestEarnings,
    };


      })
    );

    


    const totalInvestment = results.reduce((sum, stock) => sum + (stock.investment ?? 0), 0);

const resultsWithPortfolio = results.map(stock => ({
  ...stock,
  portfolio:
    totalInvestment > 0
      ? ((stock.investment / totalInvestment) * 100).toFixed(2)
      : "NA",
}));



console.log("Final results:", resultsWithPortfolio);



    return resultsWithPortfolio

  } catch (error) {
    console.error("Error fetching stock data:", error);

    return false
  }


}