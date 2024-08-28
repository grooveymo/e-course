import React from 'react';
import { Input } from './Input';
import Checkbox from './Checkbox';
import './SearchFilter.css';
import { FormAction, FormState } from '../hooks/searchFilterReducer';

export interface SearchFilterProps {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
}
const SearchFilter = ({ state, dispatch }: SearchFilterProps) => {
  //   const [state, dispatch] = useReducer(
  //     searchFilterFormReducer,
  //     searchFilterInitialState
  //   );

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
          label="Enrolled"
          isChecked={state.unstarted}
          setIsChecked={() => dispatch({ type: 'TOGGLE_UNSTARTED' })}
        />
      </div>
    </div>
  );
};

export default SearchFilter;
