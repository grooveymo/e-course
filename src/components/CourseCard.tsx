import { ClockIcon, CheckCircledIcon, LayersIcon } from '@radix-ui/react-icons';
import LinkButton from './LinkButton';
import { useNavigate } from 'react-router-dom';

import './CourseCard.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCourse } from '../services/courses';

import { useState } from 'react';
import Modal from './Modal';

export interface CourseCardProps {
  id?: string;
  name: string;
  duration: number;
  totalModules: number;
  totalModulesCompleted: number;
}

const CourseCard = ({
  id,
  name,
  duration,
  totalModules,
  totalModulesCompleted,
}: CourseCardProps) => {
  const navigate = useNavigate();

  //----------------------------------------------------
  // Employ the useState hook to manage the modal state
  //----------------------------------------------------
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = (): void => setIsModalOpen(true);
  const closeModal = (): void => setIsModalOpen(false);

  //------------------------------------------------------
  // Employ React Query's mutation hook
  // to call an API endpoint to delete a course
  //------------------------------------------------------
  const queryClient = useQueryClient();
  // React Query mutation hook
  const deleteCourseMutation = useMutation({
    mutationFn: deleteCourse,
  });

  const handleDelete = () => {
    deleteCourseMutation.mutate(id, {
      onSuccess: (data) => {
        console.log('Course deleted:', data);

        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['courses'] });

        // Handle success (e.g., show a success message, reset form)
        navigate('/courses');
      },
      onError: (error) => {
        console.error('Error deleting course:', error);
        // Handle error (e.g., show error message)
      },
    });
  };

  return (
    <>
      <div className="course-card" key={id}>
        <div className="course-stats">
          <h3 className="course-title">{name}</h3>
          <div className="stat">
            <span className="stat-icon">
              <ClockIcon />
            </span>
            {duration} hrs
          </div>
        </div>
        <div className="course-stats">
          <div className="stat completed">
            {totalModulesCompleted > 0 && (
              <span className="stat-icon">
                <CheckCircledIcon />
              </span>
            )}
            {totalModulesCompleted} Completed
          </div>
          <div className="stat">
            <span className="stat-icon">
              <LayersIcon />
            </span>
            {totalModules} Modules
          </div>
        </div>
        <div className="button-container">
          <LinkButton
            variant="primary"
            onClick={() => navigate(`/edit-course/${id}`)}
          >
            Edit
          </LinkButton>
          <LinkButton variant="secondary" onClick={() => openModal()}>
            Delete
          </LinkButton>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleDelete}>
        <h2>Are you sure you want to delete:</h2>
        <p className="course-title">{name}</p>
      </Modal>
    </>
  );
};

export default CourseCard;
