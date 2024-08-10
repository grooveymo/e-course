import React from 'react';
import { fetchCourses } from '../service/course';
import { useQuery } from '@tanstack/react-query';

const Courses: React.FC = () => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses,
  });

  console.log('data:', data);
  console.log('isError:', isError);
  console.log('isSuccess:', isSuccess);
  console.log('isLoading:', isLoading);

  return <h1>Welcome to the Courses Page</h1>;
};

export default Courses;
