// src/components/ResumeInput.jsx
import React from 'react';
import './ResumeInput.css';

const ResumeInput = ({ resume, setResume, handleSearch, loading }) => {
  return (
    <div className="resume-input">
      <textarea
        className="resume-textarea"
        placeholder="Paste your resume here..."
        value={resume}
        onChange={(e) => setResume(e.target.value)}
        rows={10}
      />
      <button className="search-button" onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Find Jobs'}
      </button>
    </div>
  );
};

export default ResumeInput;
