import { useAuthContext } from "./useAuthContext";
import {useNoteContext} from './useNoteContext';

export const useLogout = () => {
    const {dispatch} = useAuthContext();
    const {dispatch:noteDispatch} = useNoteContext();
    const logout = () => {
        //Remove user from localStorage:
        localStorage.removeItem('user');
        //Dispatch logout action:
        dispatch({type:"LOGOUT"});

        noteDispatch({type:"SET_NOTES",payload:null});

    }
    return {logout};
}