import React, {useState, useContext} from "react";
import { FirebaseContext } from '../context/firebase/firebaseContext';

export const Form = () => {
  const [value, setValue] = useState('');
  const firebase = useContext(FirebaseContext);

  const submitHandler = event => {
    event.preventDefault();
    if (value.trim()) {
      firebase.addNote(value.trim());
    }
    setValue('');
  }

  return (
    <form onSubmit={submitHandler}>
      
      <div className="input-group mb-3 add">
        <input 
          type="text" 
          className="form-control" 
          placeholder="" 
          value={value}
          onChange={ e => setValue(e.target.value) }
        />
        <div className="input-group-append">
          <button className="btn btn-outline-success" type="submit">
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
