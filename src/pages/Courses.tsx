import React, { useEffect } from 'react';

const fetchCourses = async () => {
  const response = await fetch('http://localhost:3000/courses');
  const data = await response.json();
  return data;
};

const Courses: React.FC = () => {
  let data;
  useEffect(() => {
    data = fetchCourses().then((data) => console.log(data));
  }, []);

  console.log('data:', data);
  return <h1>Welcome to the Courses Page</h1>;
};

export default Courses;
