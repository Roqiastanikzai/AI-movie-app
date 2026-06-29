import { supabase } from '../config.js';
import movies from '../content.js';

function normalizeText(text = '') {
  return String(text).toLowerCase();
}

function findPoster(title) {
  if (!title) return '';
  const normalizedTitle = String(title).toLowerCase().trim();
  const movie = movies.find((item) => item.title.toLowerCase().trim() === normalizedTitle);
  return movie?.poster || '';
}

function applyPoster(movie) {
  return {
    ...movie,
    poster: movie.poster || findPoster(movie.title),
  };
}

function scoreMovie(movie, fallbackText = '') {
  const fullText = `${movie.title} ${movie.content} ${movie.releaseYear}`.toLowerCase();
  const normalizedText = normalizeText(fallbackText);
  let score = 0;

  if (normalizedText.includes('fun')) {
    if (fullText.includes('comedy') || fullText.includes('adventure') || fullText.includes('fantasy')) {
      score += 3;
    }
  }

  if (normalizedText.includes('serious')) {
    if (fullText.includes('drama') || fullText.includes('history') || fullText.includes('biography')) {
      score += 3;
    }
  }

  if (normalizedText.includes('scary')) {
    if (fullText.includes('thriller') || fullText.includes('horror') || fullText.includes('scary')) {
      score += 3;
    }
  }

  if (normalizedText.includes('inspiring')) {
    if (fullText.includes('inspiring') || fullText.includes('drama')) {
      score += 3;
    }
  }

  const preferenceWords = normalizedText.split(/[^a-z0-9]+/).filter(Boolean);
  for (const word of preferenceWords) {
    if (word.length < 3) continue;
    if (fullText.includes(word)) {
      score += 2;
    }
  }

  return score;
}

function buildFallbackMovies(fallbackText = '') {
  return movies
    .map((movie) => ({ ...movie, _score: scoreMovie(movie, fallbackText) }))
    .sort((a, b) => b._score - a._score)
    .slice(0, 5)
    .map(({ _score, ...movie }) => applyPoster(movie));
}

export async function searchMovies(vectorEmbedding, fallbackText = '') {
  if (supabase) {
    try {
      const { data, error } = await supabase.rpc('match_movies', {
        query_embedding: vectorEmbedding,
        match_threshold: 0.2,
        match_count: 5, // Fetch top 5 to support 'Next Recommendation'
      });

      if (!error && data?.length) {
        return data.map((movie) => applyPoster(movie));
      }
    } catch (error) {
      console.warn('Supabase vector search unavailable:', error.message);
    }
  }

  return buildFallbackMovies(fallbackText);
}