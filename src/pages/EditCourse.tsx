import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCourse } from '../services/courses';

type RouteParams = {
  id: string;
};

const EditCourse = () => {
  const { id } = useParams<RouteParams>();

  const { data } = useQuery({
    queryKey: ['course', id],
    queryFn: () => fetchCourse(id as string),
    enabled: !!id, // Only run the query if we have an id
  });

  console.log('>>> data:', data);
  return (
    <div>
      <h1>Edit Course</h1>
      {/* We'll add our form here */}
    </div>
  );
};

export default EditCourse;
