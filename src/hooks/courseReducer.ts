import { Course } from '../types/course';

// Define the possible actions
type CourseAction =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_TOTAL_MODULES'; payload: number }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'RESET'; payload?: Course }
  | { type: 'SET_TOTAL_MODULES_COMPLETED'; payload: number };

// Initial state
export const initialCreateState: Course = {
  name: '',
  totalModules: 0,
  duration: 0,
};

// Reducer function
export const courseReducer = (state: Course, action: CourseAction): Course => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_TOTAL_MODULES':
      return { ...state, totalModules: action.payload };
    case 'SET_DURATION':
      return { ...state, duration: action.payload };
    case 'RESET':
      return initialCreateState;
    case 'SET_TOTAL_MODULES_COMPLETED':
      return { ...state, totalModules: action.payload };
    default:
      return state;
  }
};
