import React from 'react';
import './CourseCard.css';

export interface CourseCardProps {
  id: string;
  name: string;
  duration: number;
  totalModules: number;
  totalModulesCompleted: number;
}

const CourseCard = ({
  id,
  name,
  duration,
  totalModules,
  totalModulesCompleted,
}: CourseCardProps) => {
  return (
    <div className="course-card" key={id}>
      <div className="course-stats">
        <h3 className="course-title">{name}</h3>
        <div className="stat">
          <span className="stat-icon">⏱</span>
          {duration} hours
        </div>
      </div>
      <div className="course-stats">
        <div className="stat completed">
          <span className="stat-icon">✓</span>
          {totalModulesCompleted} Completed
        </div>
        <div className="stat">
          <span className="stat-icon">📚</span>
          {totalModules} Modules
        </div>
      </div>
      <button className="continue-button">Continue Learning</button>
    </div>
  );
};

export default CourseCard;
