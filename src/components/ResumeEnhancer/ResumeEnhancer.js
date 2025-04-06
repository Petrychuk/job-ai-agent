// src/components/ResumeEnhancer.js
import React, { useState } from 'react';
import './ResumeEnhancer.css';

const ResumeEnhancer = ({ resume }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [optimizedResume, setOptimizedResume] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOptimizeResume = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/optimize-resume`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume, jobDescription })
      });

      const data = await response.json();
      setOptimizedResume(data.optimizedResume);
    } catch (err) {
      console.error('Optimization failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-enhancer">
      <h2>Optimize Resume for ATS</h2>
      <textarea
        placeholder="Paste job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        rows={6}
      />
      <button onClick={handleOptimizeResume} disabled={loading}>
        {loading ? 'Optimizing...' : 'Optimize Resume'}
      </button>

      {optimizedResume && (
        <div className="optimized-output">
          <h3>Optimized Resume:</h3>
          <pre>{optimizedResume}</pre>
        </div>
      )}
    </div>
  );
};

export default ResumeEnhancer;
