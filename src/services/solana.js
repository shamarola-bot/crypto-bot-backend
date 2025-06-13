const { Connection, PublicKey } = require("@solana/web3.js");

class SolanaService {
  constructor() {
    this.connection = new Connection(process.env.SOLANA_RPC_URL, "confirmed");
  }

  async getBalance(publicKey) {
    try {
      const pubKey = new PublicKey(publicKey);
      const balance = await this.connection.getBalance(pubKey);
      return balance / 1e9; // Convert lamports to SOL
    } catch (error) {
      throw new Error(`Failed to get balance: ${error.message}`);
    }
  }

  async createSwapTransaction(fromPubKey, tokenMint, amount) {
    return {
      transaction: "serialized_transaction",
      message: "Swap transaction created (placeholder)",
    };
  }
}

module.exports = new SolanaService();
