export const fetchCourses = async () => {
  //TODO - inspect the network tab in the browser dev tools 
  //     - if you change the URL to http://localhost:3000/coursesXXX you will see the error message in the console
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
