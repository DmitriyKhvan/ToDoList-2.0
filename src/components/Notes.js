import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { NoteItem } from './NoteItem';
import { Wrapper } from '../components/Wrapper';

export const Notes = ({ notes, removeNote}) => {

  return (
    <TransitionGroup component="ul" className="list-group">
      <Wrapper />
      {notes.map(note => {
        return (
          <CSSTransition
            key={note.id}
            classNames={'note'}
            timeout={800}
          >
            <li className="list-group-item">
              <NoteItem note={note} removeNote={removeNote}/> 
            </li>
          </ CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};
