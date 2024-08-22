import React from 'react';
import './CourseCard.css';

// export interface CourseCardProps {}

const CourseCard = () => {
  return (
    <div className="course-card">
      <div className="course-stats">
        <h3 className="course-title">Introduction to React</h3>
        <div className="stat">
          <span className="stat-icon">⏱</span>
          24 hrs
        </div>
      </div>
      <div className="course-stats">
        <div className="stat completed">
          <span className="stat-icon">✓</span>8 Completed
        </div>
        <div className="stat">
          <span className="stat-icon">📚</span>
          12 Modules
        </div>
      </div>
      <button className="continue-button">Continue Learning</button>
    </div>
  );
};

export default CourseCard;
