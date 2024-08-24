// Define the state shape
interface CourseState {
  name: string;
  totalModules: number;
  duration: number; // in hours
}

// Define the possible actions
type CourseAction =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_TOTAL_MODULES'; payload: number }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'RESET' };

// Initial state
export const initialCreateState: CourseState = {
  name: '',
  totalModules: 0,
  duration: 0,
};

// Reducer function
export const addCourseReducer = (
  state: CourseState,
  action: CourseAction
): CourseState => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_TOTAL_MODULES':
      return { ...state, totalModules: action.payload };
    case 'SET_DURATION':
      return { ...state, duration: action.payload };
    case 'RESET':
      return initialCreateState;
    default:
      return state;
  }
};
