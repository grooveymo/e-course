import { Course } from '../types/course';

export const fetchCourses = async () => {
  const response = await fetch('http://localhost:3000/courses', {
    headers: {
      Accept: 'application/json',
    },
  });

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};

export const createCourse = async (courseData: Course): Promise<Course> => {
  const response = await fetch('http://localhost:3000/courses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(courseData),
  });

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return await response.json();
};
