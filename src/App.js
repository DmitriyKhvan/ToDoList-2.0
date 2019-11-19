import React, { useContext, useEffect } from "react";
import { Form } from "./components/Form";
import { Notes } from "./components/Notes";
import { Header } from "./components/Header";
import { Loader } from "./components/Loader";
import { FirebaseContext } from './context/firebase/firebaseContext';
const App = () => {
  const { loading, notes, fetchNotes, removeNote } = useContext(FirebaseContext);

  useEffect(() => {
    fetchNotes();
  
    // eslint-disable-next-line
  }, []);

  return (
    
    <div className="d-flex">
      {console.log('loading', loading)}
      <div className="todo">
        <Header />
        {
          loading
            ? <Loader />
            : <Notes notes={notes} removeNote={removeNote}/>
        }
        <Form />
      </div>
    </div>
  );
};

export default App;
