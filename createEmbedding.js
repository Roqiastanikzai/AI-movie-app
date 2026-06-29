import { openai } from './config.js';

export async function createEmbedding(textProfile) {
  if (!openai) {
    return null;
  }

  try {
    const response = await openai.embeddings.create({
      model: 'openai/text-embedding-3-small',
      input: textProfile,
    });

    return response.data?.[0]?.embedding ?? null;
  } catch (error) {
    console.warn('Embedding generation unavailable:', error.message);
    return null;
  }
}