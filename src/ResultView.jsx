export default function ResultView({ recommendation, loading, onNextRecommendation, explanation }) {
  const buildTitlePoster = (title = 'Movie Poster') => {
    const safeTitle = String(title).slice(0, 20);
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='180' viewBox='0 0 120 180'><rect width='120' height='180' fill='%23212130'/><text x='50%' y='45%' fill='%23ffffff' font-family='Arial,Helvetica,sans-serif' font-size='12' text-anchor='middle' dominant-baseline='middle'>${safeTitle}</text><text x='50%' y='65%' fill='%23ffffff' font-family='Arial,Helvetica,sans-serif' font-size='10' text-anchor='middle' dominant-baseline='middle'>Poster</text></svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  };

  const titlePosterMap = {
    'Avatar: The Way of the Water': 'https://tse4.mm.bing.net/th/id/OIP.iGavFjpzR52Sb24WaVZ7mQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',
    'The Fabelmans': 'https://tse2.mm.bing.net/th/id/OIP.OC982mMm6aJ2GT2ECVbKqgHaFG?rs=1&pid=ImgDetMain&o=7&rm=3',
    'Troll': 'https://tse2.mm.bing.net/th/id/OIP.lTJMZLCi_XRI5-BpG-CGCQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
    'Everything Everywhere All at Once': 'https://tse4.mm.bing.net/th/id/OIP.8AL_oyLonZQstAlkJTKhCgHaLH?rs=1&pid=ImgDetMain&o=7&rm=3',
    'Oppenheimer': 'https://tse4.mm.bing.net/th/id/OIP.-ocFuaVQyabO3ydosrlQkgHaEo?rs=1&pid=ImgDetMain&o=7&rm=3',
    'Barbie': 'https://tse3.mm.bing.net/th/id/OIP.CBYyHpUflrfxYVImyQAGeQHaDh?rs=1&pid=ImgDetMain&o=7&rm=3',
    'Spider-Man: Across the Spider-Verse': 'https://tse3.mm.bing.net/th/id/OIP.NN0SjMqnwSdWa-kmkJZvaAHaLH?rs=1&pid=ImgDetMain&o=7&rm=3',
    'Pathaan': 'https://tse2.mm.bing.net/th/id/OIP.UOVUbuAGdTQ72oQ5oL7diQHaJ3?rs=1&pid=ImgDetMain&o=7&rm=3',
    'RRR': 'https://tse2.mm.bing.net/th/id/OIP.DsyE699dbPH9mT4ZpWKh7gHaLG?rs=1&pid=ImgDetMain&o=7&rm=3',
  };

  const normalizedTitle = String(recommendation?.title || 'Movie Poster').trim();
  const posterUrl = recommendation?.poster || recommendation?.Poster || titlePosterMap[normalizedTitle] || buildTitlePoster(normalizedTitle);
  const fallbackPoster = buildTitlePoster(normalizedTitle);

  if (loading) {
    return (
      <div style={styles.card}>
        <h2 style={styles.loadingText}>Querying Database Matrix...</h2>
        <p>Parsing semantic vector embeddings and assembling data layers...</p>
      </div>
    );
  }

  const movieTitle = recommendation?.title || 'No recommendation available';
  const movieDesc = recommendation?.description || 'We could not identify a matching movie right now.';
  const movieYear = recommendation?.releaseYear || '';
  const movieExplanation = explanation || recommendation?.explanation || recommendation?.expalantion || 'Your request is being processed with a fallback recommendation.';

  return (
    <div style={styles.card}>
      <h1 style={styles.title}>Your Ideal Match!</h1>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', alignItems: 'center' }}>
        <img
          src={posterUrl}
          alt="Poster"
          style={styles.poster}
          onError={(event) => {
            event.currentTarget.src = fallbackPoster;
          }}
        />
      </div>

      <h2 style={styles.movieTitle}>
        {movieTitle}{' '}
        <span style={styles.year}>{movieYear}</span>
      </h2>
      <p style={styles.movieDesc}>
        <strong>Synopsis:</strong> {movieDesc}
      </p>

      <div style={styles.explanationBox}>
        <h3>Why your group will love it:</h3>
        <p style={styles.explanationText}>{movieExplanation}</p>
      </div>

      <div style={{ display: 'flex', gap: '15px' }}>
        <button onClick={onNextRecommendation} style={styles.button}>
          Next Suggestion
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: '#161624',
    padding: '30px',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '600px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '25px',
    color: '#e94560',
  },
  poster: {
    width: '120px',
    height: '180px',
    borderRadius: '6px',
    objectFit: 'cover',
    backgroundColor: '#222',
  },
  movieTitle: {
    margin: '0 0 10px 0',
    fontSize: '22px',
    color: '#fff',
  },
  year: {
    color: '#888',
    fontSize: '16px',
  },
  movieDesc: {
    margin: '0',
    color: '#ccc',
    fontSize: '13px',
    lineHeight: '1.4',
  },
  explanationBox: {
    backgroundColor: '#22223b',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '25px',
  },
  explanationText: {
    color: '#ccc',
    fontSize: '14px',
    lineHeight: '1.6',
  },
  button: {
    flex: 1,
    padding: '12px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#e94560',
    color: '#fff',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  loadingText: {
    color: '#e94560',
  },
};
