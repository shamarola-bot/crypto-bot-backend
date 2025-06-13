const { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } = require("@solana/web3.js");
const { Token, TOKEN_PROGRAM_ID } = require("@solana/spl-token");

class SolanaService {
  constructor() {
    this.connection = new Connection(process.env.SOLANA_RPC_URL, "confirmed");
  }

  async getBalance(publicKey) {
    try {
      const pubKey = new PublicKey(publicKey);
      const balance = await this.connection.getBalance(pubKey);
      return balance / LAMPORTS_PER_SOL; // Convert lamports to SOL
    } catch (error) {
      throw new Error(`Failed to get balance: ${error.message}`);
    }
  }

  async buyMemecoin(publicKey, memecoinMint, amountInSol) {
    try {
       try {
    const fromPublicKey = new PublicKey(publicKey);
    const amountInLamports = amountInSol * LAMPORTS_PER_SOL;

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: fromPublicKey,
        toPubkey: new PublicKey(memecoinMint),
        lamports: amountInLamports,
      })
    );

    const { blockhash } = await this.connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = fromPublicKey;

    // This will fail without a signer; log the error for debugging
    const signature = await this.connection.sendRawTransaction(transaction.serialize());
    await this.connection.confirmTransaction(signature);

    return { message: `Bought ${amountInSol} SOL worth of ${memecoinMint}`, signature };
  } catch (error) {
    console.error("Buy error:", error.message);
    throw new Error(`Buy failed: ${error.message}`);
  }
    } catch (error) {
      throw new Error(`Buy failed: ${error.message}`);
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