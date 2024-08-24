import React from 'react';

import { PlusCircledIcon } from '@radix-ui/react-icons';

import { fetchCourses } from '../services/courses';
import { useQuery } from '@tanstack/react-query';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import CourseCard, { CourseCardProps } from '../components/CourseCard';
import LinkButton from '../components/LinkButton';

import './Courses.css';

const Courses: React.FC = () => {
  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses,
  });

  console.log('data:', data);
  console.log('isError:', isError);
  console.log('error:', error?.message);
  console.log('isSuccess:', isSuccess);
  console.log('isLoading:', isLoading);

  return (
    <>
      <h1>Welcome to the Courses Page</h1>
      {isLoading && <Loader />}
      {isError && <ErrorMessage message={error?.message || 'Error'} />}

      {isSuccess && (
        <>
          <div className="create-course">
            <div>
              <PlusCircledIcon className="add-icon" />
              <LinkButton variant={'primary'}>Add course</LinkButton>
            </div>
          </div>
          <div className="course-card-layout">
            {data.map((course: CourseCardProps) => (
              <CourseCard
                key={course.id}
                id={course.id}
                name={course.name}
                duration={course.duration}
                totalModules={course.totalModules}
                totalModulesCompleted={course.totalModulesCompleted}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Courses;
