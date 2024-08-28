import React, { useMemo, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircledIcon } from '@radix-ui/react-icons';

import { fetchCourses } from '../services/courses';
import { useQuery } from '@tanstack/react-query';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import CourseCard from '../components/CourseCard';
import LinkButton from '../components/LinkButton';

import './Courses.css';
import SearchFilter from '../components/SearchFilter';
import { Course } from '../types/course';
import {
  FormState,
  searchFilterFormReducer,
  searchFilterInitialState,
} from '../hooks/searchFilterReducer';

const doFilter = (data: Course[] = [], state: FormState): Course[] => {
  return data.filter((course) => {
    const matchesSearch =
      !state.searchQuery ||
      course.name.toLowerCase().includes(state.searchQuery.toLowerCase());

    const isCompleted = course.totalModulesCompleted === course.totalModules;
    const isPartiallyCompleted = course.totalModulesCompleted  &&
      course.totalModulesCompleted > 0 &&
      course.totalModulesCompleted < course.totalModules;
    const isUnstarted = !course.totalModulesCompleted;

    const matchesCompletion =
      (!state.completed && !state.partiallyCompleted && !state.unstarted) ||
      (state.completed && isCompleted) ||
      (state.partiallyCompleted && isPartiallyCompleted) ||
      (state.unstarted && isUnstarted);

    return matchesSearch && matchesCompletion;
  });
};

const Courses: React.FC = () => {
  const { data, isLoading, isError, error, isSuccess } = useQuery<Course[]>({
    queryKey: ['courses'],
    queryFn: fetchCourses,
  });

  console.log('data:', data);
  console.log('isError:', isError);
  console.log('error:', error?.message);
  console.log('isSuccess:', isSuccess);
  console.log('isLoading:', isLoading);

  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate('/add-course');
  };

  const [state, dispatch] = useReducer(
    searchFilterFormReducer,
    searchFilterInitialState
  );

  const filtereData = useMemo(() => doFilter(data, state), [data, state]);
  console.log('filteredData:', filtereData);

  return (
    <>
      <h1>Welcome to the Courses Page</h1>
      {isLoading && <Loader />}
      {isError && <ErrorMessage message={error?.message || 'Error'} />}

      {isSuccess && (
        <>
          <SearchFilter state={state} dispatch={dispatch} />
          <div className="create-course">
            <div>
              <PlusCircledIcon className="add-icon" />
              <LinkButton variant={'primary'} onClick={handleNavigation}>
                Add course
              </LinkButton>
            </div>
          </div>
          <div className="course-card-layout">
            {/* {data.map((course: CourseCardProps) => ( */}
            {filtereData.map((course: Course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                name={course.name}
                duration={course.duration}
                totalModules={course.totalModules}
                totalModulesCompleted={course.totalModulesCompleted || 0}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Courses;
