const { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL, Keypair } = require("@solana/web3.js");
const fs = require("fs");

class SolanaService {
  constructor() {
  this.connection = new Connection(process.env.SOLANA_RPC_URL || "https://api.devnet.solana.com", "confirmed");
  // Hardcoded keypair for testing (insecure, replace with secure method in production)
  this.serverKeypair = Keypair.fromSecretKey(Uint8Array.from([54,102,78,26,137,104,113,198,5,83,243,62,39,75,62,72,119,115,183,164,171,237,212,107,158,56,42,181,5,73,208,147,34,189,198,55,18,162,37,128,249,34,246,31,46,151,41,9,47,192,155,124,212,246,112,228,64,131,215,165,41,59,211,177]));
}

  async buyMemecoin(publicKey, memecoinMint, amountInSol) {
    try {
      const fromPublicKey = new PublicKey(publicKey);
      const amountInLamports = amountInSol * LAMPORTS_PER_SOL;

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: this.serverKeypair.publicKey, // Use server key as sender
          toPubkey: new PublicKey(memecoinMint),
          lamports: amountInLamports,
        })
      );

      const { blockhash } = await this.connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = this.serverKeypair.publicKey;

      // Sign with server keypair
      transaction.sign(this.serverKeypair);

      console.error("Signing with server key:", this.serverKeypair.publicKey.toBase58());
      const signature = await this.connection.sendRawTransaction(transaction.serialize());
      await this.connection.confirmTransaction(signature);

      return { message: `Bought ${amountInSol} SOL worth of ${memecoinMint}`, signature };
    } catch (error) {
      console.error("Buy error details:", error.message, error.stack);
      throw new Error(`Buy failed: ${error.message}`);
    }
  }
}

module.exports = new SolanaService();