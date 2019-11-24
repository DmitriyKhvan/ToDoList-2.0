import React, { useReducer } from "react";
import axios from "axios";
import { firebaseReducer } from "./firebaseReducer";
import { FirebaseContext } from "./firebaseContext";
import {
  ADD_NOTE,
  FETCH_NOTES,
  SHOW_LOADER,
  REMOVE_NOTE,
  EDIT_NOTE,
  NULL_NOTES,
  SEARCH_NOTES,
  STATUS_NOTES
} from "../types";

const url = "https://todolist-6e9bb.firebaseio.com";

export const FirebaseState = ({ children }) => {
  const initialState = {
    notes: [],
    loading: false,
    term: "",
    status: "all"
  };

  const [state, dispatch] = useReducer(firebaseReducer, initialState);

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const fetchNotes = async () => {
    showLoader();
    const res = await axios.get(`${url}/notes.json`);

    if (res.data) {
      const payload = Object.keys(res.data).map(key => {
        return {
          id: key,
          ...res.data[key]
        };
      });

      dispatch({
        type: FETCH_NOTES,
        payload
      });
    }

    dispatch({
      type: NULL_NOTES
    });
  };

  const addNote = async noteText => {
    const note = {
      noteText,
      date: new Date().toJSON(),
      complete: false,
      important: false
    };

    const res = await axios.post(`${url}/notes.json`, note);
    const payload = {
      id: res.data.name,
      ...note
    };

    dispatch({
      type: ADD_NOTE,
      payload
    });
  };

  // function raf(fn) {
  //   window.requestAnimationFrame(function() {
  //     window.requestAnimationFrame(function() {
  //       fn();
  //     })
  //   })
  // }

  const draw = (leg, elem, elemTop) => {
    elem.style.top = elemTop - leg + "px";
  };

  const editNote = async (id, noteText, complete, important) => {
    
    const note = {
      noteText,
      date: new Date().toJSON(),
      complete,
      important
    };

    axios.patch(`${url}/notes/${id}.json`, note);

    const payload = {
      id,
      ...note
    };

    dispatch({
      type: EDIT_NOTE,
      payload
    });
  };

  const noteImportant = async (id, noteText, complete, important, e) => {
    let elem = e.target.parentNode.parentNode;
    if(!elem.classList.contains('list-group-item')){
      elem = elem.parentNode;
    }
    // console.log(elem);
    const elemImp = document.querySelectorAll(".important");
    let elemImpLastHeight = document.querySelector("li").offsetTop;

    if (elemImp.length) {
      elemImpLastHeight = elemImp[elemImp.length - 1].offsetTop + 57;
    }

    const elemHeight = elem.offsetTop;
    const elemTop = elemHeight - elemImpLastHeight;

    if (elemTop > 0) {
      elem.style.top = elemTop - 57 + "px";
      let i = 1;

      setTimeout(function go() {
        // сколько времени прошло с начала анимации?
        let timePassed = 20 * i;
        let leg = (elemTop * timePassed) / 1000;
        
        // отрисовать анимацию на момент timePassed, прошедший с начала анимации
        draw(leg, elem, elemTop);
        if (i < 50) setTimeout(go, 20);
        i++;
      }, 20);
    }

    const note = {
      noteText,
      date: new Date().toJSON(),
      complete,
      important
    };

    axios.patch(`${url}/notes/${id}.json`, note);

    const payload = {
      id,
      ...note
    };

    dispatch({
      type: EDIT_NOTE,
      payload
    });
  };

  const noteComplete = async (id, noteText, complete, important, e) => {
    let elem = e.target.parentNode.parentNode;
    if(!elem.classList.contains('list-group-item')){
      elem = elem.parentNode;
    }
    
    const elemImp = document.querySelectorAll(".complete");
    const elemImpLast = document.querySelectorAll("li");
    let elemImpLastHeight = elemImpLast[elemImpLast.length - 1].offsetTop;

    if (elemImp.length) {
      elemImpLastHeight = elemImp[0].offsetTop - 57;
    }

    const elemHeight = elem.offsetTop;
    const elemTop = elemHeight - elemImpLastHeight;

    
    if (elemTop <= 0) {
      elem.style.top = elemTop + 57 + "px";
      let i = 1;

      setTimeout(function go() {
        // сколько времени прошло с начала анимации?
        let timePassed = 20 * i;
        let leg = (elemTop * timePassed) / 1000;
        
        // отрисовать анимацию на момент timePassed, прошедший с начала анимации
        draw(leg, elem, elemTop);
        if (i < 50) setTimeout(go, 20);
        i++;
      }, 20);
    }

    const note = {
      noteText,
      date: new Date().toJSON(),
      complete,
      important
    };

    axios.patch(`${url}/notes/${id}.json`, note);

    const payload = {
      id,
      ...note
    };

    dispatch({
      type: EDIT_NOTE,
      payload
    });
  };

  const removeNote = async id => {
    axios.delete(`${url}/notes/${id}.json`);

    dispatch({
      type: REMOVE_NOTE,
      payload: id
    });
  };

  const onSearchChange = term => {
    dispatch({
      type: SEARCH_NOTES,
      payload: term
    });
  };

  const searchTask = notes => {
    if (state.term.length === 0) {
      return notes;
    }
    return notes.filter(note => {
      return note.noteText.toLowerCase().indexOf(state.term.toLowerCase()) > -1;
    });
  };

  const setStatusFilster = status => {
    dispatch({
      type: STATUS_NOTES,
      payload: status
    });
  };

  const filterNotes = notes => {
    switch (state.status) {
      case "all":
        return notes;
      case "done":
        return notes.filter(note => note.complete);
      case "active":
        return notes.filter(note => !note.complete);
      default:
        return notes;
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        notes: filterNotes(searchTask(state.notes))
          .sort((a, b) => a.complete - b.complete)
          .sort((a, b) => b.important - a.important),
        loading: state.loading,
        status: state.status,
        addNote,
        editNote,
        removeNote,
        showLoader,
        fetchNotes,
        onSearchChange,
        setStatusFilster,
        noteImportant,
        noteComplete
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
