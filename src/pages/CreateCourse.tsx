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

  //------------------------------------------------------
  // Employ React Query's mutation hook
  // to call an API endpoint to create a course
  //------------------------------------------------------
  const queryClient = useQueryClient();

  // React Query mutation hook
  const createCourseMutation = useMutation({
    mutationFn: createCourse,
  });

  const navigate = useNavigate();
  const handleSubmit = () => {
    const { name, duration, totalModules } = state;

    createCourseMutation.mutate(
      {
        name,
        duration,
        totalModules,
      },
      {
        onSuccess: (data) => {
          console.log('Course created:', data);

          // Invalidate and refetch
          queryClient.invalidateQueries({ queryKey: ['courses'] });

          // Handle success - redirect to the course list page
          navigate('/courses');
        },
        onError: (error) => {
          console.error('Error creating course:', error);
          // Handle error (e.g., show error message)
        },
      }
    );
  };

  return (
    <>
      <h1>Add a course</h1>
      <Form
        onSubmit={() => handleSubmit()}
        onReset={() => dispatch({ type: 'RESET' })}
      >
        <Input
          label="Course Name"
          name="name"
          type="text"
          placeholder="Enter course name"
          value={state.name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: 'SET_NAME', payload: event.target.value });
          }}
          error={state.errors?.name}
        />
        <Input
          label="Course Duration"
          name="duration"
          type="number"
          placeholder="Enter course duration"
          value={state.duration}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch({
              type: 'SET_DURATION',
              payload: parseFloat(event.target.value),
            });
          }}
          error={state.errors?.duration}
        />
        <Input
          label="Total number of Modules"
          name="totalModules"
          type="number"
          placeholder="Enter total number of modules"
          value={state.totalModules}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch({
              type: 'SET_TOTAL_MODULES',
              payload: parseInt(event.target.value, 10),
            });
          }}
          error={state.errors?.totalModules}
        />
        <div className="button-container">
          <Button
            type="submit"
            variant={'primary'}
            disabled={!state?.isFormValid}
          >
            Submit
          </Button>
          <Button type="reset" variant={'secondary'}>
            Reset
          </Button>
        </div>
      </Form>
    </>
  );
};

export default CreateCourse;
