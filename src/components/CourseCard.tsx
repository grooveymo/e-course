import { ClockIcon, CheckCircledIcon, LayersIcon } from '@radix-ui/react-icons';
import LinkButton from './LinkButton';

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
          <span className="stat-icon">
            <ClockIcon />
          </span>
          {duration} hrs
        </div>
      </div>
      <div className="course-stats">
        <div className="stat completed">
          {totalModulesCompleted > 0 && (
            <span className="stat-icon">
              <CheckCircledIcon />
            </span>
          )}
          {totalModulesCompleted} Completed
        </div>
        <div className="stat">
          <span className="stat-icon">
            <LayersIcon />
          </span>
          {totalModules} Modules
        </div>
      </div>
      <div className="button-container">
        <LinkButton variant="primary">Edit</LinkButton>
        <LinkButton variant="secondary">Delete</LinkButton>
      </div>
    </div>
  );
};

export default CourseCard;
