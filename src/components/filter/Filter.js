import React from 'react';
import './filter.css';

const Filter = ({ onSelectGenderCats, onSelectFavoured }) => {
  return (
    <div className="filter-container">
      <div className="filter-favour">
        <label htmlFor="favourite">favourite</label>
        <select
          onChange={e => {
            onSelectFavoured(e.target.value);
          }}
          name="favourite"
          id="favourite"
        >
          <option value={'Any'}>Any</option>
          <option value={'favoured'}>favoured</option>
          <option value={'not favoured'}>not favoured</option>
        </select>
      </div>
      <div className="filter-gender">
        <label htmlFor="gender">selectGender</label>
        <select
          onChange={e => {
            onSelectGenderCats(e.target.value);
          }}
          id="gender"
          name="gender"
        >
          <option value={'Any'}>Any</option>
          <option value={'male'}>male</option>
          <option value={'female'}>female</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
