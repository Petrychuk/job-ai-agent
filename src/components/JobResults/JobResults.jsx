// src/components/JobResults.jsx
import React from 'react';
import './JobResults.css';

const JobResults = ({ jobs, onOptimize, onCoverLetter }) => {
  return (
    <div className="results">
      {jobs.map((job, idx) => (
        <div key={idx} className="job-card">
          <p className="job-date"><strong>Posted:</strong>{new Date(job.date).toLocaleDateString()}</p>
          <h3 className="job-title">{job.title}</h3>
          <p className="job-company"><strong>Company:</strong>{job.company}</p>
          <a className="job-link" href={job.link} target="_blank" rel="noreferrer">View Job</a>

          <div className="job-actions">
            <button onClick={() => onOptimize(job)}>Optimize Resume</button>
            <button onClick={() => onCoverLetter(job)}>Generate Cover Letter</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobResults;


