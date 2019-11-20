import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../context/firebase/firebaseContext';

export const NoteEditItem = ({note, setEdit}) => {
  const firebase = useContext(FirebaseContext);
  const [value, setValue] = useState(note.noteText);
 
  const submitHandler = (event) => {
    event.preventDefault();
    if (value.trim()) {
      firebase.editNote(note.id, value.trim(), note.complete, note.important);
    }
    setEdit(false);
  }

  return (
    <form onSubmit={submitHandler}>
      <input 
        className="form-control"
        type="text"
        value={value}
        autoFocus   
        onClick={(e) => e.stopPropagation()}   
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  )
}
