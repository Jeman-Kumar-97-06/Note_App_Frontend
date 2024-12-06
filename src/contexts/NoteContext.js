import {createContext, useReducer} from 'react';

export const NoteContext = createContext();

export const noteReducer = (state,action) => {
    switch(action.type){
        case 'SET_NOTES':
            return {
                notes : action.payload
            }
        case 'CREATE_NOTE':
            return {
                notes : [action.payload,...state.notes]
            }
        case 'DELETE_NOTE':
            return {
                notes : state.notes.filter(n=>n._id !== action.payload._id)
            }
        case "UPDATE_NOTE":
            const note_upd  = state.notes.filter(note=>note._id ===  action.payload._id);
            const note_indx = state.notes.indexOf(note_upd[0]);
            state.notes.splice(note_indx,1,action.payload)
            return {
                notes : state.notes
            }
        default:
            return state
    }
};

export const NoteContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(noteReducer,{notes:null});
    return (
        <NoteContext.Provider value={{...state,dispatch}}>
            {children}
        </NoteContext.Provider>
    )
}