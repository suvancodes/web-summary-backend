const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const summarize = require("./summarize");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/summarize", async (req, res) => {
  const { url } = req.body;
  try {
    const summary = await summarize(url);
    res.json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to summarize" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
