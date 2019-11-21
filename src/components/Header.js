import React from "react";

export const Header = ({notes}) => {
  const doneTask = notes.filter(note => note.complete).length;
  const todoTask = notes.length - doneTask;

  return (
    <div className="header d-flex">
      <h1>My ToDoList</h1>
      <div>{ todoTask } more to do, { doneTask } done</div>  
    </div>
  );
};
