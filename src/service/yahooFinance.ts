



import yahooFinance from 'yahoo-finance2';

export async function getStockPrice(ticker: string , exchange: string) {
  try {
    
     let yahooTicker = ticker;
    if (exchange.toUpperCase() === "NSE") {
      yahooTicker += ".NS";
    } else if (exchange.toUpperCase() === "BSE") {
      yahooTicker += ".BO";
    }
    // You can add more exchanges if needed

    const quote = await yahooFinance.quote(yahooTicker);


    
    return {
      currentPrice: quote?.regularMarketPrice ?? "N/A"
    };
  } catch (error) {
    console.error(`Error fetching stock data for ${ticker}:`, error);

    
    return {
      currentPrice: "N/A"
    };
  }
}



(async () => {
  const result = await getStockPrice('ICICIBANK','NSE');
  console.log(result);
})();
