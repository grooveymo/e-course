import { Course } from '../types/course';

// Declare a type matching Course without the id field
type CourseFields = Omit<Course, 'id'>;

// Define the form state - we want to store the course fields and any validation errors pluse
// a flag to indicate if the form is valid
interface CourseState extends CourseFields {
  errors?: {
    [K in keyof CourseFields]?: string;
  };
  isFormValid?: boolean;
}

// Define the possible actions
type CourseAction =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_TOTAL_MODULES'; payload: number }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'RESET'; payload?: Course }
  | { type: 'SET_TOTAL_MODULES_COMPLETED'; payload: number };

// Initial state
export const initialFormState: CourseState = {
  name: '',
  totalModules: 0,
  duration: 0,
  totalModulesCompleted: 0,
};

const isCourseNameValid = (name: string) => {
  if (name.length < 3) {
    return 'Course name must be at least 3 characters long';
  }
  return undefined;
};

const isDurationValid = (duration: number) => {
  if (duration <= 0) {
    return 'Duration must be greater than 0';
  }
  return undefined;
};
const isTotalModulesValid = (totalModules: number) => {
  if (totalModules <= 0) {
    return 'Total modules must be greater than 0';
  }
  return undefined;
};
const isTotalModulesCompletedValid = (totalModulesCompleted: number) => {
  if (totalModulesCompleted < 0) {
    return 'Total number of modules completed must be greater or equal to 0';
  }
  return undefined;
};
const isFormValid = (state: CourseState) => {
  return (
    !isCourseNameValid(state.name) &&
    !isDurationValid(state.duration) &&
    !isTotalModulesValid(state.totalModules) &&
    !isTotalModulesCompletedValid(state?.totalModulesCompleted || 0)
  );
};
// Reducer function
export const courseReducer = (
  state: CourseState,
  action: CourseAction
): CourseState => {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.payload,
        errors: { ...state?.errors, name: isCourseNameValid(action.payload) },
        isFormValid: isFormValid({ ...state, name: action.payload }),
      };
    case 'SET_TOTAL_MODULES':
      return {
        ...state,
        totalModules: action.payload,
        errors: {
          ...state?.errors,
          totalModules: isTotalModulesValid(action.payload),
        },
        isFormValid: isFormValid({ ...state, totalModules: action.payload }),
      };
    case 'SET_DURATION':
      return {
        ...state,
        duration: action.payload,
        errors: { ...state?.errors, duration: isDurationValid(action.payload) },
        isFormValid: isFormValid({ ...state, duration: action.payload }),
      };
    case 'SET_TOTAL_MODULES_COMPLETED':
      return {
        ...state,
        totalModulesCompleted: action.payload,
        errors: {
          ...state?.errors,
          totalModulesCompleted: isTotalModulesCompletedValid(action.payload),
        },
        isFormValid: isFormValid({
          ...state,
          totalModulesCompleted: action.payload,
        }),
      };
    case 'RESET':
      return initialFormState;

    default:
      return state;
  }
};
