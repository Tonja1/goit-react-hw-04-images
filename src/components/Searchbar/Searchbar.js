import { useState } from 'react';
import {
    SearchBar,
    SearchForm,
    SearchFormButton,
    SearchFormButtonLabel,
    SearchFormInput,
} from './SearchbarStyled';

import propTypes from 'prop-types';

export const SearchBarForm = ({ onSubmit }) => {
  
  const [search, setSearch] = useState('');
  const handleChange = ({ target }) => {
    const { value } = target;
    setSearch(value);
  };

  const hendleSubmit = event => {
    event.preventDefault();
    onSubmit(event);
    setSearch('');
  };
 
  return (
    <SearchBar>
      <SearchForm onSubmit={hendleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          <IconSearch width="24px" height="24px" />
        </SearchFormButton>
 
        <SearchFormInput
          value={search}
          name="search"
          onChange={handleChange}
          type="text"
          autocomplete="off"
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchBar>
  );
  
  function IconSearch(props) {
    return (
      <svg
        fill="currentColor"
        viewBox="0 0 16 16"
        height="1em"
        width="1em"
        {...props}
      >
        <path d="M11.742 10.344a6.5 6.5 0 10-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 001.415-1.414l-3.85-3.85a1.007 1.007 0 00-.115-.1zM12 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" />
      </svg>
    );
  };
  // eslint-disable-next-line
  SearchBarForm.propTypes = {
    onSubmit: propTypes.func.isRequired,
  };
};