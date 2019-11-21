import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../context/firebase/firebaseContext';

export const SearchPanel = () => {
  const { onSearchChange } = useContext(FirebaseContext);
  const [value, setValue]  = useState('');

  const searchHandler = (event) => {
    setValue(event);
    onSearchChange(event);
  }

  //console.log(value)
  return (
      <div className="search">
        <input 
          className="form-control"
          type="text"
          placeholder="Search task"
          value={value}
          onChange = {e => searchHandler(e.target.value)}
        />
      </div>
  )
}