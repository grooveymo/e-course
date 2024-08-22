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
