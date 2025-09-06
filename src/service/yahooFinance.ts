// import yahooFinance from 'yahoo-finance2';

// export async function getStockPrice(ticker: string): Promise<void> {
//   try {
    
//     const quote = await yahooFinance.quote(ticker);
    
//     console.log(`Current Price (CMP): ${quote.regularMarketPrice}`);
    
//   } catch (error) {
//     console.error('Error fetching stock data:', error);
//   }
// }

// // Examples:
// // NSE: ICICI Bank
// getStockPrice('ICICIBANK.NS');




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
      ticker,
      currentPrice: quote?.regularMarketPrice ?? "N/A"
    };
  } catch (error) {
    console.error(`Error fetching stock data for ${ticker}:`, error);

    
    return {
      ticker,
      currentPrice: "N/A"
    };
  }
}



(async () => {
  const result = await getStockPrice('ICICIBANK','NSE');
  console.log(result);
})();
