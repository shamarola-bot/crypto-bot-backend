const express = require("express");
const router = express.Router();
const solanaService = require("../services/solana");

router.get("/balance/:publicKey", async (req, res) => {
  try {
    const balance = await solanaService.getBalance(req.params.publicKey);
    res.json({ balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/signal/solana", (req, res) => {
  // Placeholder signal logic
  res.json({ signal: "buy", price: 145.19, movingAverage: 155.11 });
});

router.post("/swap", async (req, res) => {
  try {
    const { publicKey, tokenMint, amount } = req.body;
    const result = await solanaService.createSwapTransaction(publicKey, tokenMint, amount);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/buy-memecoin", async (req, res) => {
  try {
    const { publicKey, memecoinMint, amountInSol } = req.body;
    const result = await solanaService.buyMemecoin(publicKey, memecoinMint, amountInSol);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;