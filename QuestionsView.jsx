import { useState } from 'react';

export default function QuestionsView({ onSubmit }) {
  const [setupMode, setSetupMode] = useState(true);
  const [groupSize, setGroupSize] = useState(1);
  const [timeAvailable, setTimeAvailable] = useState('20 mins');
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [allResponses, setAllResponses] = useState([]);
  const [favoriteMovie, setFavoriteMovie] = useState('');
  const [whyEnjoy, setWhyEnjoy] = useState('');
  const [eraPreference, setEraPreference] = useState('New');
  const [tonePreference, setTonePreference] = useState('Fun');
  const [strandedPerson, setStrandedPerson] = useState('');

  const handleStart = (e) => {
    e.preventDefault();
    setSetupMode(false);
  };

  const handleNextOrSubmit = (e) => {
    e.preventDefault();

    const responseBlock = {
      favoriteMovie,
      whyEnjoy,
      eraPreference,
      tonePreference,
      strandedPerson,
    };

    const updatedResponses = [...allResponses, responseBlock];
    setAllResponses(updatedResponses);

    if (currentUserIndex + 1 < groupSize) {
      setCurrentUserIndex(currentUserIndex + 1);
      setFavoriteMovie('');
      setWhyEnjoy('');
      setStrandedPerson('');
    } else {
      onSubmit({ groupSize, timeAvailable, responses: updatedResponses });
    }
  };

  if (setupMode) {
    return (
      <form onSubmit={handleStart} style={styles.card}>
        <h1 style={styles.title}>PopChoice Movie Advisor</h1>

        <label style={styles.label}>How many people are attending movie night?</label>
        <input
          type="number"
          min="1"
          value={groupSize}
          onChange={(e) => setGroupSize(parseInt(e.target.value, 10) || 1)}
          style={styles.input}
          required
        />

        <label style={styles.label}>How much time do we have?</label>
        <select
          value={timeAvailable}
          onChange={(e) => setTimeAvailable(e.target.value)}
          style={styles.input}
        >
          <option value="90 mins">Short (~90 mins)</option>
          <option value="120 mins">Standard (~120 mins)</option>
          <option value="180 mins">Epic (~180 mins)</option>
        </select>

        <button type="submit" style={styles.button}>
          Press Start
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleNextOrSubmit} style={styles.card}>
      <div style={styles.badge}>Person {currentUserIndex + 1} of {groupSize}</div>

      <h2 style={{ ...styles.title, marginTop: '10px' }}>Movie Preference</h2>

      <label style={styles.label}>What's your favorite movie?</label>
      <input
        type="text"
        value={favoriteMovie}
        onChange={(e) => setFavoriteMovie(e.target.value)}
        placeholder="Movie title..."
        required
        style={styles.input}
      />

      <label style={styles.label}>Why do you enjoy it?</label>
      <textarea
        value={whyEnjoy}
        onChange={(e) => setWhyEnjoy(e.target.value)}
        placeholder="What elements make it great..."
        required
        style={{ ...styles.input, height: '50px', resize: 'none' }}
      />

      <label style={styles.label}>Are you in the mood for something New or Classic?</label>
      <select
        value={eraPreference}
        onChange={(e) => setEraPreference(e.target.value)}
        style={styles.input}
      >
        <option value="New">New</option>
        <option value="Classic">Classic</option>
      </select>

      <label style={styles.label}>What tone are you in the mood for?</label>
      <select
        value={tonePreference}
        onChange={(e) => setTonePreference(e.target.value)}
        style={styles.input}
      >
        <option value="Fun">Fun</option>
        <option value="Serious">Serious</option>
        <option value="Inspiring">Inspiring</option>
        <option value="Scary">Scary</option>
      </select>

      <label style={styles.label}>Which film person would you be stranded on an island with and why?</label>
      <textarea
        value={strandedPerson}
        onChange={(e) => setStrandedPerson(e.target.value)}
        placeholder="Actor/Director reason..."
        required
        style={{ ...styles.input, height: '50px', resize: 'none' }}
      />

      <button type="submit" style={styles.button}>
        {currentUserIndex + 1 < groupSize ? 'Next Person' : 'Get Combined Recommendations'}
      </button>
    </form>
  );
}

const styles = {
  card: {
    background: '#161624',
    padding: '30px',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '500px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    backgroundColor: '#e94560',
    color: '#fff',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  title: {
    textAlign: 'center',
    marginBottom: '25px',
    color: '#e94560',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#bbb',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '6px',
    border: '1px solid #444',
    backgroundColor: '#0f0f1b',
    color: '#fff',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#e94560',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};