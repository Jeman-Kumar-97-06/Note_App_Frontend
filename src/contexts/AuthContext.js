import {createContext,useEffect,useReducer} from 'react';

export const AuthContext = createContext();

export const authReducer = (state,action) => {
    switch (action.type) {
        case 'LOGIN':
            return {user:action.payload}
        case 'LOGOUT':
            return {user:null}
        default:
            return state;
    } 
}

//all code inside this will when children [all components wrapped by AuthContextProvider] render.
export const AuthContextProvider = ({children})=> {
    const [state,dispatch] = useReducer(authReducer,{user:null});
    //This will run when children render.
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dispatch({type:"LOGIN",payload:user});
        }
    },[]);

    console.log('AuthContext State: ',state);
    return (
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}