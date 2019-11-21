import React, { useContext } from 'react';
import { FirebaseContext } from '../context/firebase/firebaseContext';

export const ItemStatusFilter = () => {
  const { setStatusFilster, status } = useContext(FirebaseContext);

  const buttons = [
    { name: 'all', title: 'All'},
    { name: 'done', title: 'Done'},
    { name: 'active', title: 'Active'}
  ] 

  return (
    <div className="btn-group">
      {buttons.map(({name, title}) => {
        const filter = name === status;
        const cls = filter ? 'btn-info' : 'btn-outline-secondary'; 
        return (
          <button 
            key={name}
            type="button" 
            className={`btn ${cls}`}
            onClick={() => setStatusFilster(name)}
          >
          { title }
          </button>
        )
      })}
    </div>
  )
}