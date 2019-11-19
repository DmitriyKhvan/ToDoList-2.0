import React, { Fragment, useState, useContext } from "react";
import { FirebaseContext } from '../context/firebase/firebaseContext'
import { NoteEditItem } from './NoteEditItem';

export const NoteItem = ({note}) => {
  const farebase = useContext(FirebaseContext);
  const [edit, setEdit] = useState(false);
  
  let complete = "fa fa-lg fa-square-o";
  if (note.complete) {
    complete = "fa fa-lg fa-check-square-o";
  } 
  
  return (
    <Fragment>
      <div 
        className="checkbox"
        onClick = {() => farebase.editNote(note.id, note.noteText, !note.complete)}
      >
        <i className={ complete }></i>
        {edit
          ? <NoteEditItem note={note} setEdit={setEdit}/>
          : <p>{note.noteText}</p>
        }
        
      </div>

      <div>
        <button
          className="btn btn-outline-warning btn-sm"
          // onClick={() => editNote(note.id, 'Edit note')}
           onClick={() => setEdit(!edit)}
        >
          <i className="fa fa-pencil" aria-hidden="true"></i>
        </button>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => farebase.removeNote(note.id)}
        >
          <i className="fa fa-lg fa-trash"></i>
        </button>
      </div>
    </Fragment>
  );
};
