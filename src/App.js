import React, { useContext, useEffect } from "react";
import { Form } from "./components/Form";
import { Notes } from "./components/Notes";
import { Header } from "./components/Header";
import { Loader } from "./components/Loader";
import { FirebaseContext } from './context/firebase/firebaseContext';
import { SearchPanel } from "./components/SearchPanel";
import { ItemStatusFilter } from './components/ItemStatusFilter';
const App = () => {
  const { loading, notes, fetchNotes, removeNote } = useContext(FirebaseContext);

  useEffect(() => {
    fetchNotes();
  
    // eslint-disable-next-line
  }, []);

  return (
    
    <div className="d-flex">
      <div className="todo">
        <Header notes={notes} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
        {
          loading
            ? <Loader />
            : notes
              ? <Notes notes={notes} removeNote={removeNote}/>
              : null
        }
        <Form />
      </div>
    </div>
  );
};

export default App;
