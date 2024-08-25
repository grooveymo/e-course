import { Input } from '../components/Input';
import Form from '../components/Form';
import Button from '../components/Button';
import { useReducer } from 'react';
import { courseReducer, initialCreateState } from '../hooks/courseReducer';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCourse } from '../services/courses';
import { useNavigate } from 'react-router-dom';

const CreateCourse = () => {
  //----------------------------------------------------
  // Employ the useReducer hook to manage the form state
  //----------------------------------------------------
  const [state, dispatch] = useReducer(courseReducer, initialCreateState);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_NAME', payload: event.target.value });
  };

  const handleModulesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SET_TOTAL_MODULES',
      payload: parseInt(event.target.value, 10),
    });
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_DURATION', payload: parseFloat(event.target.value) });
  };

  //------------------------------------------------------
  // Employ React Query's mutation hook to create a course
  //------------------------------------------------------

  const queryClient = useQueryClient();

  // React Query mutation hook
  const createCourseMutation = useMutation({
    mutationFn: createCourse,
  });

  const navigate = useNavigate();
  const handleSubmit = () => {
    createCourseMutation.mutate(state, {
      onSuccess: (data) => {
        console.log('Course created:', data);

        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['courses'] });

        // Handle success (e.g., show a success message, reset form)
        navigate('/courses');
      },
      onError: (error) => {
        console.error('Error creating course:', error);
        // Handle error (e.g., show error message)
      },
    });
  };
  //----------------------------------------------
  return (
    <>
      <h1>Add a course</h1>
      <Form onSubmit={() => handleSubmit()}>
        <Input
          label="Course Name"
          name="name"
          type="text"
          placeholder="Enter course name"
          value={state.name}
          onChange={handleNameChange}
        />
        <Input
          label="Course Duration"
          name="duration"
          type="number"
          placeholder="Enter course duration"
          value={state.duration}
          onChange={handleDurationChange}
        />
        <Input
          label="Total number of Modules"
          name="totalModulesCompleted"
          type="number"
          placeholder="Enter your username"
          value={state.totalModules}
          onChange={handleModulesChange}
        />
        <Button type="submit" variant={'primary'}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default CreateCourse;
