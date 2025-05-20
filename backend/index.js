const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { JSDOM } = require("jsdom");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post("/summarize", async (req, res) => {
  const { url } = req.body;

  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    // Fetch raw HTML content
    const response = await axios.get(url);
    const dom = new JSDOM(response.data);
    const textContent = dom.window.document.body.textContent;

    // Call DeepSeek API
    const summaryRes = await axios.post(
      "https://api.deepseek.ai/summarize",
      {
        text: textContent,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        },
      }
    );

    res.json({ summary: summaryRes.data.summary || "No summary available" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error summarizing the webpage." });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
