import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { NoteItem } from './NoteItem';

export const Notes = ({ notes, removeNote}) => {

  return (
    <TransitionGroup component="ul" className="list-group">
      {notes.map(note => {
        let cls = "list-group-item";
        if (note.important) {
          cls += " important";
        } 
        if (note.complete) {
          cls += " complete";
        }

        return (
          <CSSTransition
            key={note.id}
            classNames={'note'}
            timeout={800}
          >
            <li className={ cls }>
              <NoteItem note={note} removeNote={removeNote}/> 
            </li>
          </ CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};
