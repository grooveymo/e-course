import React, { useReducer } from 'react';
import { Input } from './Input';
import Checkbox from './Checkbox';
import './SearchFilter.css';

// Define the state interface
interface FormState {
  searchQuery: string;
  completed: boolean;
  partiallyCompleted: boolean;
  unstarted: boolean;
}

// Define the action types
type FormAction =
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'TOGGLE_COMPLETED' }
  | { type: 'TOGGLE_PARTIALLY_COMPLETED' }
  | { type: 'TOGGLE_UNSTARTED' }
  | { type: 'RESET_FORM' };

// Define the initial state
const initialState: FormState = {
  searchQuery: '',
  completed: false,
  partiallyCompleted: false,
  unstarted: false,
};

// Define the reducer function
function formReducer(state: FormState, action: FormAction): FormState {
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
      return initialState;
    default:
      return state;
  }
}

const SearchFilter = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  console.log('search state:', state);

  return (
    <div className="search-filters-container">
      <div className="search">
        <Input
          name="search"
          label="Search"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })
          }
        />
      </div>
      <div className="filters">
        <Checkbox
          label="Completed"
          isChecked={state.completed}
          setIsChecked={() => dispatch({ type: 'TOGGLE_COMPLETED' })}
        />
        <Checkbox
          label="Partially Completed"
          isChecked={state.partiallyCompleted}
          setIsChecked={() => dispatch({ type: 'TOGGLE_PARTIALLY_COMPLETED' })}
        />
        <Checkbox
          label="Unstarted"
          isChecked={state.unstarted}
          setIsChecked={() => dispatch({ type: 'TOGGLE_UNSTARTED' })}
        />
      </div>
    </div>
  );
};

export default SearchFilter;
