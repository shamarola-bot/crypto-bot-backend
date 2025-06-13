const axios = require("axios");

class AIService {
  async getPriceData(tokenId = "solana") {
    try {
      const response = await axios.get(
        `${process.env.COINGECKO_API_URL}/coins/${tokenId}/market_chart`,
        {
          params: { vs_currency: "usd", days: 7 },
        }
      );
      return response.data.prices;
    } catch (error) {
      throw new Error(`Failed to fetch price data: ${error.message}`);
    }
  }

  async generateBuySignal(tokenId) {
    const prices = await this.getPriceData(tokenId);
    const closingPrices = prices.map((p) => p[1]);
    const movingAverage =
      closingPrices.reduce((sum, price) => sum + price, 0) /
      closingPrices.length;
    const currentPrice = closingPrices[closingPrices.length - 1];

    return currentPrice < movingAverage * 0.95
      ? { signal: "buy", price: currentPrice, movingAverage }
      : { signal: "hold", price: currentPrice, movingAverage };
  }
}

module.exports = new AIService();
