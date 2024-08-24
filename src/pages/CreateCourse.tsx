import { Input } from '../components/Input';
import Form from '../components/Form';
import Button from '../components/Button';
import { useReducer } from 'react';
import { addCourseReducer, initialCreateState } from '../hooks/addCreateCourse';

const CreateCourse = () => {
  const [state, dispatch] = useReducer(addCourseReducer, initialCreateState);

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

  return (
    <>
      <h1>Add a course</h1>
      <Form onSubmit={() => console.log('submitted', state)}>
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
