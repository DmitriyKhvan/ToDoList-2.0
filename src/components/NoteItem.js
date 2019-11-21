import React, { Fragment, useState, useContext } from "react";
import { FirebaseContext } from '../context/firebase/firebaseContext'
import { NoteEditItem } from './NoteEditItem';

export const NoteItem = ({note}) => {
  const firebase = useContext(FirebaseContext);
  const [edit, setEdit] = useState(false);

  let complete = "fa fa-lg fa-square-o";
  if (note.complete) {
    complete = "fa fa-lg fa-check-square-o";
  } 
  
  return (
    <Fragment>
      <div 
        className="checkbox"
        onClick = {() => firebase.editNote(note.id, note.noteText, !note.complete, false)}
      >
        <i className={ complete }></i>
        {edit
          ? <NoteEditItem note={note} setEdit={setEdit}/>
          : <p>{note.noteText}</p>
        }
        
      </div>

      <div className="buttons">
        <button
          className="btn btn-outline-success btn-sm"
           onClick={() => setEdit(!edit)}
        >
          <i className="fa fa-pencil" aria-hidden="true"></i>
        </button>

        <button
          className="btn btn-outline-warning btn-sm"
          onClick={(e) => firebase.editNote(note.id, note.noteText, false, !note.important, e)}
        >
          <i className="fa fa-exclamation-triangle"></i>
        </button>

        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => firebase.removeNote(note.id)}
        >
          <i className="fa fa-trash"></i>
        </button>
      </div>
    </Fragment>
  );
};
