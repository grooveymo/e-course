import React, { useReducer } from 'react';
import Button from './Button';
import { Input } from './Input';
import Form from './Form';
import { courseReducer } from '../hooks/courseReducer';
import { Course } from '../types/course';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { updateCourse } from '../services/courses';

export interface EditCourseFormProps {
  data: Course;
}

const EditCourseForm = ({ data }: EditCourseFormProps) => {
  //----------------------------------------------------
  // Employ the useReducer hook to manage the form state
  //----------------------------------------------------
  const initialEditState = {
    id: data.id,
    name: data.name || '',
    duration: data.duration || 0,
    totalModules: data.totalModules || 0,
    totalModulesCompleted: data.totalModulesCompleted || 0,
  };

  const [state, dispatch] = useReducer(courseReducer, initialEditState);

  //------------------------------------------------------
  // Employ React Query's mutation hook
  // to call an API endpoint to create a course
  //------------------------------------------------------
  const queryClient = useQueryClient();

  // React Query mutation hook
  const editCourseMutation = useMutation({
    mutationFn: updateCourse,
  });

  const navigate = useNavigate();
  const handleSubmit = () => {
    const { name, duration, totalModules, totalModulesCompleted } = state;
    editCourseMutation.mutate(
      {
        id: data.id,
        name,
        duration,
        totalModules,
        totalModulesCompleted,
      },
      {
        onSuccess: (data) => {
          console.log('Course update:', data);

          // Invalidate and refetch
          queryClient.invalidateQueries({ queryKey: ['course', state.id] });

          // Handle success (e.g., show a success message, reset form)
          navigate('/courses');
        },
        onError: (error) => {
          console.error('Error updating course:', error);
          // Handle error (e.g., show error message)
        },
      }
    );
  };

  return (
    <Form onSubmit={() => handleSubmit()}>
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
        placeholder="Enter the total number of modules"
        value={state.totalModules}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          dispatch({
            type: 'SET_TOTAL_MODULES',
            payload: parseInt(event.target.value, 10),
          });
        }}
        error={state.errors?.totalModules}
      />
      <Input
        label="Number of Modules Completed"
        name="totalModulesCompleted"
        type="number"
        placeholder="Enter number of modules completed"
        value={state.totalModulesCompleted}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          dispatch({
            type: 'SET_TOTAL_MODULES_COMPLETED',
            payload: parseInt(event.target.value, 10),
          });
        }}
        error={state.errors?.totalModulesCompleted}
      />
      <Button type="submit" variant={'primary'} disabled={!state?.isFormValid}>
        Submit
      </Button>
    </Form>
  );
};

export default EditCourseForm;
