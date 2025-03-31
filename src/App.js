
import './App.css';

// src/App.jsx
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [resume, setResume] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!resume.trim()) return;
    setLoading(true);
    try {
      const response = await fetch('https://job-ai-backend.onrender.com/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume })
      });
      const data = await response.json();
      setJobs(data.jobs);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>AI Job Match Agent</h1>
      <textarea
        placeholder="Paste your resume here..."
        value={resume}
        onChange={(e) => setResume(e.target.value)}
        rows={10}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Find Jobs'}
      </button>

      <div className="results">
        {jobs.map((job, idx) => (
          <div key={idx} className="job-card">
            <h3>{job.title}</h3>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Score:</strong> {job.score}/10</p>
            <a href={job.link} target="_blank" rel="noreferrer">View Job</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

