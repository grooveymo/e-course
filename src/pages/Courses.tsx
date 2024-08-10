import React from 'react';
import { fetchCourses } from '../service/course';
import { useQuery } from '@tanstack/react-query';

const Courses: React.FC = () => {
  
  const query = useQuery({ queryKey: ['courses'], queryFn: fetchCourses });

  console.log('data:', query);

  return <h1>Welcome to the Courses Page</h1>;
};

export default Courses;
