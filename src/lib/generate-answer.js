"use server";
import { ChatOpenAI } from "@langchain/openai";
import { env } from "./config";
import { embedDocs } from "./vector-store";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { getPineconeClient } from "./pinecone-client";
import { HttpsProxyAgent } from "https-proxy-agent";
import { Dispatcher, ProxyAgent } from "undici";
import { Pinecone } from "@pinecone-database/pinecone";
import * as fs from "fs";

const agent = new HttpsProxyAgent("http://10.39.152.30:3128");
// https://js.langchain.com/v0.2/docs/integrations/chat/openai/
// https://js.langchain.com/v0.2/docs/integrations/chat/azure/
const cert = fs.readFileSync(
  "/usr/local/ssl/certificate/tracuu7/cert_tracuu7_161024.pem"
);


export async function generateAnswer(query, retrievedChunks) {
  const llm = new ChatOpenAI(
    {
      model: "gpt-4o-mini",
    },
    { httpAgent: agent }
  );

  // Join retrieved chunks into a single context string
  const context = retrievedChunks.join(" ");

  // Construct the prompt with specific instructions
  const systemMessage = `You are an AI that answers questions strictly based on the provided context. 
  If the context doesn't contain enough information, respond with "I do not have enough info to answer this question."`;

  const humanMessage = `Context: ${context}\n\nQuestion: ${query}`;

  // Invoke the LLM with the system and human messages
  const aiMsg = await llm.invoke([
    ["system", systemMessage],
    ["human", humanMessage],
  ]);

  // Extract the answer from the model's response
  const answer = aiMsg.content.trim();

  return answer;
}

export async function retrieveRelevantChunks(query) {
  const embeddingDataArr = await embedDocs([query]);
  // const pc = await getPineconeClient();
  const client = new ProxyAgent("http://10.39.152.30:3128");
  const customFetch = (input, init) => {
    return fetch(input, {
      ...init,
      dispatcher: client,
      keepalive: true,
    });
  };

  const config = {
    apiKey: "409e625d-dec0-4241-88bc-30efca393b76",
    fetchApi: customFetch,
  };

  const pc = new Pinecone(config);

  const index = pc.index("index-start");
  const ns = index.namespace("name-space");
  console.log("ns", ns);
  const results = await ns.query({
    vector: embeddingDataArr[0].embedding,
    topK: 5, // Number of relevant chunks to retrieve
    includeValues: true,
    includeMetadata: true,
  });

  console.log("results", results);
  return results.matches.map((match) => match.metadata.chunk);
}
