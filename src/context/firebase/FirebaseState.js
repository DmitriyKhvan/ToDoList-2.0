import React, { useReducer } from 'react';
import axios from 'axios';
import { firebaseReducer } from './firebaseReducer';
import { FirebaseContext } from './firebaseContext'
import { 
  ADD_NOTE, 
  FETCH_NOTES, 
  SHOW_LOADER, 
  REMOVE_NOTE, 
  EDIT_NOTE,
  NULL_NOTES 
} from '../types';

const url = 'https://todolist-6e9bb.firebaseio.com';

export const FirebaseState = ({children}) => {

  const initialState = {
    notes: [],
    loading: false
  }

  const [state, dispatch] = useReducer(firebaseReducer, initialState);

  const showLoader = () => dispatch({type: SHOW_LOADER});

  const fetchNotes = async () => {
    showLoader();
    const res = await axios.get(`${url}/notes.json`);
    
    if (res.data) {
      const payload = Object.keys(res.data).map(key => {
        return {
          id: key,
          ...res.data[key]
        }
      })

      dispatch({
        type: FETCH_NOTES,
        payload
      })
    }

    dispatch({
      type: NULL_NOTES
    })

  }

  const addNote = async (noteText) => {
    const note = {
      noteText,
      date: new Date().toJSON(),
      complete: false,
      important: false
    }

    const res = await axios.post(`${url}/notes.json`, note);
    const payload = {
      id: res.data.name,
      ...note
    }

    dispatch({
      type: ADD_NOTE,
      payload
    });
  }

  const editNote = async (id, noteText, complete, important) => {
    const note = {
      noteText,
      date: new Date().toJSON(),
      complete,
      important
    }

    axios.patch(`${url}/notes/${id}.json`, note)

    const payload = {
      id,
      ...note
    }

    dispatch({
      type: EDIT_NOTE,
      payload
    })
  }

  const removeNote = async id => {
    axios.delete(`${url}/notes/${id}.json`);

    dispatch({
      type: REMOVE_NOTE,
      payload: id
    });
  }

  return (
    <FirebaseContext.Provider value={{
      notes: state.notes
        .sort((a, b) => a.complete - b.complete)
        .sort((a, b) => b.important - a.important),
      loading: state.loading,
      addNote,
      editNote,
      removeNote,
      showLoader,
      fetchNotes
    }}>
      {children}
    </FirebaseContext.Provider>
  )
}