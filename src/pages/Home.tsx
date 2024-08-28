import React from 'react';
import { Course } from '../types/course';
import { useQuery } from '@tanstack/react-query';
import { fetchCourses } from '../services/courses';
import './Home.css';
import KPI from '../components/KPI';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';

type KPIData = {
  totalCourses: number;
  totalCompleted: number;
  totalInProgress: number;
  totalNotStarted: number;
};

const titles: Record<keyof KPIData, string> = {
  totalCourses: 'Total',
  totalCompleted: 'Completed',
  totalInProgress: 'In Progress',
  totalNotStarted: 'Not Started',
};

const generateKPI = (data: Course[]): { title: string; value: number }[] => {
  const totalCourses = data.length;
  const totalCompleted = data.filter(
    (course) => course.totalModules === course.totalModulesCompleted
  ).length;
  const totalInProgress = data.filter(
    (course) =>
      course.totalModulesCompleted &&
      course.totalModulesCompleted > 0 &&
      course.totalModulesCompleted < course.totalModules
  ).length;
  const totalNotStarted = data.filter(
    (course) => !course.totalModulesCompleted
  ).length;

  return [
    { title: titles.totalCourses, value: totalCourses },
    { title: titles.totalCompleted, value: totalCompleted },
    { title: titles.totalInProgress, value: totalInProgress },
    { title: titles.totalNotStarted, value: totalNotStarted },
  ];
};

const Home: React.FC = () => {
  const { data, isLoading, isError, error, isSuccess } = useQuery<Course[]>({
    queryKey: ['courses'],
    queryFn: fetchCourses,
  });

  const kpiData = generateKPI(data || []);

  return (
    <>
      <h1>Welcome to the Home Page</h1>
      {isLoading && <Loader />}
      {isError && <ErrorMessage message={error?.message} />}

      {isSuccess && kpiData && (
        <div className="kpi-layout">
          {kpiData.map((kpi) => (
            <KPI key={kpi.title} title={kpi.title} value={kpi.value} />
          ))}
        </div>
      )}
      {isSuccess && !kpiData && <ErrorMessage message="No data found" />}
    </>
  );
};

export default Home;
