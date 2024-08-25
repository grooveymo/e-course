import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { fetchCourse } from '../services/courses';
import { Input } from '../components/Input';
import Button from '../components/Button';
import Form from '../components/Form';

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
      <Form onSubmit={() => null}>
        <Input
          label="Course Name"
          name="name"
          type="text"
          placeholder="Enter course name"
        />
        <Input
          label="Course Duration"
          name="duration"
          type="number"
          placeholder="Enter course duration"
        />
        <Input
          label="Total number of Modules"
          name="totalModules"
          type="number"
          placeholder="Enter the total number of modules"
        />
        <Input
          label="Number of Modules Completed"
          name="totalModulesCompleted"
          type="number"
          placeholder="Enter number of modules completed"
        />
        <Button type="submit" variant={'primary'}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default EditCourse;
