import axios from "axios";

const API_URL =
  "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english";
const API_KEY = process.env.HUGGINGFACE_API_KEY;

async function analyzeChunk(chunk) {
  try {
    const response = await axios.post(
      API_URL,
      { inputs: chunk },
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    );

    console.log({ response });

    const [result] = response.data;
    return result;
  } catch (error) {
    console.error("Error calling Hugging Face API:", error);
    throw error;
  }
}

export async function analyzeSentiment(text) {
  // Split the text into chunks of roughly 450 tokens (words)
  const chunks = text.match(/[\s\S]{1,450}/g) || [];

  let totalPositive = 0;
  let totalNegative = 0;
  let totalNeutral = 0;

  for (const chunk of chunks) {
    const result = await analyzeChunk(chunk);
    for (const item of result) {
        const { label, score } = item;
      if (label === "POSITIVE") {
        totalPositive += score;
        totalNegative += 1 - score;
      } else {
        totalNegative += score;
        totalPositive += 1 - score;
      }
      // Add a small neutral component
      totalNeutral += 0.1;
    }
  }

  // Calculate averages
  const numChunks = chunks.length;
  let positive = totalPositive / numChunks;
  let negative = totalNegative / numChunks;
  let neutral = totalNeutral / numChunks;

  // Normalize to ensure sum is 1
  const total = positive + negative + neutral;
  positive /= total;
  negative /= total;
  neutral /= total;

  return { positive, negative, neutral };
}
