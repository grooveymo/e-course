import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { fetchCourse } from '../services/courses';
import EditCourseForm from '../components/EditCourseForm';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

type RouteParams = {
  id: string;
};

const EditCourse = () => {
  const { id } = useParams<RouteParams>();

  const { data, isSuccess, isError, error, isLoading } = useQuery({
    queryKey: ['course', id],
    queryFn: () => fetchCourse(id as string),
    enabled: !!id, // Only run the query if we have an id
    select: (data) => data,
  });

  return (
    <div>
      <h1>Edit Course</h1>
      {isLoading && <Loader />}
      {isError && <ErrorMessage message={error.message} />}
      {isSuccess && <EditCourseForm data={data} />}
    </div>
  );
};

export default EditCourse;
