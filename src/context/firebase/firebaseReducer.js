import { 
  ADD_NOTE, 
  REMOVE_NOTE, 
  EDIT_NOTE, 
  FETCH_NOTES, 
  SHOW_LOADER,
  NULL_NOTES,
  SEARCH_NOTES,
  STATUS_NOTES
} from "../types";

export const firebaseReducer = (state, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload]
      }
    case REMOVE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload)
      }
    case EDIT_NOTE: 
      const idx = state.notes.findIndex((el) => el.id === action.payload.id);
      
      return {
        ...state,
        notes: [ ...state.notes.slice(0, idx),
                action.payload,
                ...state.notes.slice(idx + 1)
              ] 
      }
  
    case FETCH_NOTES:
      return {
        ...state,
        notes: action.payload,
        loading: false
      }
    case SHOW_LOADER:
      return {
        ...state,
        loading: true
      }
    case NULL_NOTES:
      return {
        ...state,
        loading: false
      }
    case SEARCH_NOTES:
      return {
        ...state, 
        term: action.payload
      }
    case STATUS_NOTES:
      return {
        ...state,
        status: action.payload
      }
    
    default: 
      return state;
  }
}