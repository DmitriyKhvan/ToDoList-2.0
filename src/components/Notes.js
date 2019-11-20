import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { NoteItem } from './NoteItem';

export const Notes = ({ notes, removeNote}) => {

  return (
    <TransitionGroup component="ul" className="list-group">
      {notes.map(note => {
        let important = "list-group-item";
        if (note.important) {
          important += " important";
        } else {
          important += " important-false"
        }

        return (
          <CSSTransition
            key={note.id}
            classNames={'note'}
            timeout={800}
          >
            <li className={ important }>
              <NoteItem note={note} removeNote={removeNote}/> 
            </li>
          </ CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};
