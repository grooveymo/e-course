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

  if (response.status !== 201) {
    throw new Error(response.statusText);
  }

  return await response.json();
};

export const fetchCourse = async (id: string): Promise<Course> => {
  if (!id) {
    throw new Error('Course ID is required');
  }
  const response = await fetch(`http://localhost:3000/courses/${id}`, {
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

export const updateCourse = async (courseData: Course): Promise<Course> => {
  if (!courseData?.id) {
    throw new Error('Course ID is required');
  }

  console.log('>>> SERVICE: Updating course:', courseData);
  try {
    const response = await fetch(
      `http://localhost:3000/courses/${courseData.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(courseData),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const updatedCourse: Course = await response.json();
    return updatedCourse;
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
};

export const deleteCourse = async (id: string): Promise<Course> => {
  if (!id) {
    throw new Error('Course ID is required');
  }
  const response = await fetch(`http://localhost:3000/courses/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
    },
  });

  // if (![200, 204].includes(response.status)) {
  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};
