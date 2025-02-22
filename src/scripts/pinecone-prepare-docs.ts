import { getChunkedDocsFromPDF } from "@/lib/pdf-loader";
import { embedDocs, storeEmbeddings } from "@/lib/vector-store";
import { getPineconeClient } from "@/lib/pinecone-client";
import { env } from "@/lib/config";
import { ChatOpenAI } from "@langchain/openai";
import { HttpsProxyAgent } from "https-proxy-agent";
const agent = new HttpsProxyAgent("http://10.39.152.30:3128");
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Dispatcher, ProxyAgent } from "undici";
import {
  Pinecone,
  type PineconeConfiguration,
} from "@pinecone-database/pinecone";
// This operation might fail because indexes likely need
// more time to init, so give some 5 mins after index
// creation and try again.
(async () => {
  try {
    // const pineconeClient = await getPineconeClient();
    // const index = pineconeClient.index(env.PINECONE_INDEX_NAME);
    // console.log("Preparing chunks from PDF file");
    // const docs = await getChunkedDocsFromPDF();
    // console.log(`Loading ${docs.length} chunks into pinecone...`);
    // const embedData = await embedDocs(docs);
    // console.log("Data embedded and stored in pine-cone index");
    // await storeEmbeddings(pineconeClient, embedData);

    // const chat = new ChatOpenAI(
    //   {
    //     temperature: 0,
    //     openAIApiKey: env.OPENAI_API_KEY,
    //   },
    //   { httpAgent: agent }
    // );
    // const systemMessage = `You are an AI that answers questions strictly based on the provided context.
    // If the context doesn't contain enough information, respond with "I do not have enough info to answer this question."`;
    // const humanMessage = "what is WikiPedia ?";
    // try {
    //   const response = await chat.invoke([
    //     ["system", systemMessage],
    //     ["human", humanMessage],
    //   ]);
    //   console.log(response);
    // } catch (e) {
    //   console.log(e);
    // }

    // const embedder = new OpenAIEmbeddings(
    //   {
    //     openAIApiKey: process.env.OPENAI_API_KEY,
    //     batchSize: 512, // Default value if omitted is 512. Max is 2048
    //     modelName: "text-embedding-3-large",
    //   },
    //   {
    //     baseOptions: {
    //       proxy: false,
    //       httpAgent: new HttpsProxyAgent("http://10.39.152.30:3128"),
    //       httpsAgent: new HttpsProxyAgent("http://10.39.152.30:3128"),
    //     },
    //   }
    // );

    // //embed the PDF documents
    // const embeddingsDataArr = []; //[{embedding: [], chunk: '}]
    // const docs = ["thông tin gói D10"];

    // for (const chunk of docs) {
    //   const embedding = await embedder.embedQuery(chunk);
    //   // console.log("Embedding ", embedding);
    //   embeddingsDataArr.push({
    //     embedding,
    //     chunk,
    //   });
    //    console.log("Embedding value", embedding);
    // }

    const client = new ProxyAgent({
      uri: "http://10.39.152.30:3128",
    });
    const customFetch = (input: string | URL | Request, init: any) => {
      return fetch(input, {
        ...init,
        dispatcher: client as any,
        keepalive: true,
      });
    };

    const config: PineconeConfiguration = {
      apiKey: process.env.PINECONE_API_KEY!,
      fetchApi: customFetch,
    };

    const pc = new Pinecone(config);

    const embeddingDataArr = await embedDocs(["thông tin gói D10"]);
    const index = pc.index(env.PINECONE_INDEX_NAME);
    const ns = index.namespace(env.PINECONE_NAME_SPACE);
    console.log("ns", ns);
    const results = await ns.query({
      vector: embeddingDataArr[0].embedding,
      topK: 5, // Number of relevant chunks to retrieve
      includeValues: true,
      includeMetadata: true,
    });

    console.log("results", results);
    return results.matches.map((match) => match?.metadata?.chunk);
  } catch (error) {
    console.error("Init client script failed ", error);
  }
})();
