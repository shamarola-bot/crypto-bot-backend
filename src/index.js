require("dotenv").config({ path: 'C:\\Users\\ilics\\crypto-bot-backend\\.env' });
const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/api");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", apiRoutes);

app.get("/", (req, res) => res.send("Crypto Bot Backend Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));