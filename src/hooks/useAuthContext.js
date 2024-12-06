import { AuthContext } from "../contexts/AuthContext";
import {useContext} from 'react';

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw Error('useAuthContext must be used inside components that have access to authContext')
    }
    return context;
}