import { useState } from 'react';
import QuestionsView from '../QuestionsView.jsx';
import ResultView from './ResultView.jsx';
import { createEmbedding } from '../createEmbedding.js';
import { searchMovies } from './searchMovies.js';
import { generateExplanation } from '../generateExpalanation.js';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [viewResults, setViewResults] = useState(false);
  const [savedPreferences, setSavedPreferences] = useState('');
  const [matchedList, setMatchedList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentExplanation, setCurrentExplanation] = useState('');

  async function handlePipelineExecution(combinedPreferences) {
    setLoading(true);
    setSavedPreferences(combinedPreferences);

    try {
      const profileText = typeof combinedPreferences === 'string'
        ? combinedPreferences
        : JSON.stringify(combinedPreferences);
      const queryVector = await createEmbedding(profileText);
      const results = await searchMovies(queryVector, profileText);

      if (!results || results.length === 0) {
        setMatchedList([]);
        setCurrentIndex(0);
        setCurrentExplanation('No matching movies were found, so a local fallback was used instead.');
        setViewResults(true);
        return;
      }

      setMatchedList(results);
      setCurrentIndex(0);
      const initialExplanation = await generateExplanation(
        profileText,
        results[0].title,
        results[0].description
      );
      setCurrentExplanation(initialExplanation);
      setViewResults(true);
    } catch (error) {
      console.error(error);
      setMatchedList([]);
      setCurrentIndex(0);
      setCurrentExplanation('The recommendation flow hit an issue, but the app is using a safe fallback experience now.');
      setViewResults(true);
    } finally {
      setLoading(false);
    }
  }

  const handleNextOption = async () => {
    const nextIdx = currentIndex + 1;
    if (nextIdx >= matchedList.length) return;

    setLoading(true);
    try {
      const nextMovie = matchedList[nextIdx];
      const freshExplanation = await generateExplanation(
        savedPreferences,
        nextMovie.title,
        nextMovie.description
      );
      setCurrentIndex(nextIdx);
      setCurrentExplanation(freshExplanation);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>PopChoice: AI Movie Matchmaker</h1>

      {!viewResults ? (
        <QuestionsView onSubmit={handlePipelineExecution} loading={loading} />
      ) : (
        <ResultView
          recommendation={matchedList[currentIndex]}
          explanation={currentExplanation}
          onNextRecommendation={handleNextOption}
          loading={loading}
        />
      )}
    </div>
  );
}
