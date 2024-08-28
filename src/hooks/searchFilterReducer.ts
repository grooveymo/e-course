// Define the state interface
export interface FormState {
  searchQuery: string;
  completed: boolean;
  partiallyCompleted: boolean;
  unstarted: boolean;
}

// Define the action types
export type FormAction =
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'TOGGLE_COMPLETED' }
  | { type: 'TOGGLE_PARTIALLY_COMPLETED' }
  | { type: 'TOGGLE_UNSTARTED' }
  | { type: 'RESET_FORM' };

// Define the initial state
export const searchFilterInitialState: FormState = {
  searchQuery: '',
  completed: false,
  partiallyCompleted: false,
  unstarted: false,
};

// Define the reducer function
export const searchFilterFormReducer = (
  state: FormState,
  action: FormAction
): FormState => {
  switch (action.type) {
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'TOGGLE_COMPLETED':
      return { ...state, completed: !state.completed };
    case 'TOGGLE_PARTIALLY_COMPLETED':
      return { ...state, partiallyCompleted: !state.partiallyCompleted };
    case 'TOGGLE_UNSTARTED':
      return { ...state, unstarted: !state.unstarted };
    case 'RESET_FORM':
      return searchFilterInitialState;
    default:
      return state;
  }
};
