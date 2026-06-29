import { openai } from './config.js';

function buildFallbackExplanation(combinedPreferences, movieTitle) {
  const profileText = typeof combinedPreferences === 'string'
    ? combinedPreferences
    : JSON.stringify(combinedPreferences);

  return `This pick aligns well with the mood and themes you described in "${profileText.slice(0, 160)}". It is a strong fit because it matches the group’s preferred style and should feel engaging for everyone.`;
}

export async function generateExplanation(combinedPreferences, movieTitle, movieDescription) {
  if (!openai) {
    return buildFallbackExplanation(combinedPreferences, movieTitle);
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are an intelligent movie advisor for the PopChoice app. Analyze the data against user preferences and generate a concise, natural-sounding 2-3 sentence explanation of why they will love it.',
        },
        {
          role: 'user',
          content: `User preferences profile: "${combinedPreferences}"\nRecommended Movie: ${movieTitle}\nDescription: ${movieDescription}`,
        },
      ],
    });

    return response.choices?.[0]?.message?.content || buildFallbackExplanation(combinedPreferences, movieTitle);
  } catch (error) {
    console.warn('Explanation generation unavailable:', error.message);
    return buildFallbackExplanation(combinedPreferences, movieTitle);
  }
}