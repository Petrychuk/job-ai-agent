import React, { useState } from 'react';
import ResumeInput from './components/ResumeInput/ResumeInput';
import JobResults from './components/JobResults/JobResults';
import './App.css';

const App = () => {
  const [resume, setResume] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [optimizedResume, setOptimizedResume] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  const handleSearch = async () => {
    if (!resume.trim()) return;
    setLoading(true);

    try {
        // 🧹 Очищаем от управляющих символов
      const cleanResume = resume.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cleanResume })
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      setJobs(data.jobs || []);
      
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOptimizeResume = async (job) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/optimize-resume`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resume,
          jobDescription: `${job.title} at ${job.company}`
        })
      });

      const data = await response.json();
      setOptimizedResume(data.optimizedResume || 'No optimized resume returned');
    } catch (err) {
      console.error('Optimization failed:', err);
    }
  };

  const handleGenerateCoverLetter = async (job) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/cover-letter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resume,
          jobTitle: job.title,
          jobDescription: `${job.title} at ${job.company}`
        })
      });

      const data = await response.json();
      setCoverLetter(data.coverLetter || 'No cover letter returned');
    } catch (err) {
      console.error('Cover letter generation failed:', err);
    }
  };

  return (
    <div className="app-container">
      <h1>AI Job Match Agent</h1>

      <ResumeInput
        resume={resume}
        setResume={setResume}
        handleSearch={handleSearch}
        loading={loading}
      />

      <JobResults
        jobs={jobs}
        onOptimize={handleOptimizeResume}
        onCoverLetter={handleGenerateCoverLetter}
      />

      {optimizedResume && (
        <div className="optimized-section">
          <h2>Optimized Resume</h2>
          <pre>{optimizedResume}</pre>
        </div>
      )}

      {coverLetter && (
        <div className="cover-letter-section">
          <h2>Generated Cover Letter</h2>
          <pre>{coverLetter}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
