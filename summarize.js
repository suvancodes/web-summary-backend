const axios = require("axios");
const cheerio = require("cheerio");
const { OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function summarize(url) {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  const text = $("p").map((i, el) => $(el).text()).get().join(" ");
  const trimmedText = text.slice(0, 5000);

  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [
      {
        role: "system",
        content: "Summarize the following content into bullet points.",
      },
      {
        role: "user",
        content: trimmedText,
      },
    ],
  });

  return completion.choices[0].message.content;
}

module.exports = summarize;
