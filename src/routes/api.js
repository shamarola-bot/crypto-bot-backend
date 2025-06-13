const express = require("express");
const router = express.Router();
const solanaService = require("../services/solana");
const aiService = require("../services/ai");

router.get("/balance/:publicKey", async (req, res) => {
  try {
    const balance = await solanaService.getBalance(req.params.publicKey);
    res.json({ balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/signal/:tokenId", async (req, res) => {
  try {
    const signal = await aiService.generateBuySignal(req.params.tokenId);
    res.json(signal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/swap", async (req, res) => {
  const { publicKey, tokenMint, amount } = req.body;
  try {
    const swapTx = await solanaService.createSwapTransaction(
      publicKey,
      tokenMint,
      amount
    );
    res.json(swapTx);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
