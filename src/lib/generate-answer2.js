// pages/api/generate-embeddings.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { texts } = req.body;

  if (!texts || !Array.isArray(texts)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const proxyUrl = process.env.PROXY_URL; // optional, use if you need a proxy

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/embeddings",
      {
        model: "text-embedding-ada-002",
        input: texts,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        ...(proxyUrl && {
          proxy: {
            host: proxyUrl.split("//")[1].split(":")[0],
            port: proxyUrl.split(":")[2],
          },
        }),
      }
    );

    const embeddings = response.data.data.map((item) => item.embedding);
    return res.status(200).json({ embeddings });
  } catch (error) {
    console.error("Error generating embeddings:", error);
    return res.status(500).json({ error: "Failed to generate embeddings" });
  }
}
