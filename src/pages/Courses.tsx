import React from 'react';
import { fetchCourses } from '../services/courses';
import { useQuery } from '@tanstack/react-query';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import CourseCard from '../components/CourseCard';

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

      <CourseCard />
    </>
  );
};

export default Courses;

// {isError && <div>Error....</div>}
// {isSuccess && (
//   <ul>
//     {data.map((course: any) => (
//       <li key={course.id}>{course.name}</li>
//     ))}
//   </ul>
// )}
