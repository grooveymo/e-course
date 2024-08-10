export const fetchCourses = async () => {
  const response = await fetch('http://localhost:3000/courses');
  const data = await response.json();
  return data;
};
