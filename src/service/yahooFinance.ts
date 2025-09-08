


// Simple in-memory cache
type CacheEntry = { currentPrice: number | string; timestamp: number };
const stockPriceCache: Record<string, CacheEntry> = {};
const CACHE_TTL = 15 * 1000; // 15 seconds




import yahooFinance from 'yahoo-finance2';

export async function getStockPrice(ticker: string , exchange: string) {

  try {

      const cacheKey = `${ticker}-${exchange}`;
    const cached = stockPriceCache[cacheKey];

   
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return { currentPrice: cached.currentPrice }; 
    }


    
     let yahooTicker = ticker;
    if (exchange.toUpperCase() === "NSE") {
      yahooTicker += ".NS";
    } else if (exchange.toUpperCase() === "BSE") {
      yahooTicker += ".BO";
    }
    // You can add more exchanges if needed

    const quote = await yahooFinance.quote(yahooTicker);

  // Save in cache
    stockPriceCache[cacheKey] = { currentPrice:quote?.regularMarketPrice ?? "N/A", timestamp: Date.now() };

    
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
