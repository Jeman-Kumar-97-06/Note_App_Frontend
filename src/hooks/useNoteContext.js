import { NoteContext } from "../contexts/NoteContext";
import {useContext} from 'react';

export const useNoteContext = () => {
    const context = useContext(NoteContext);
    if (!context) {
        throw Error('useNoteContext must be used inside components that have access to notecontext')
    }
    return context;
}