import {useState} from 'react';
import {useAuthContext} from './useAuthContext';

//This custom hook is a function that returns [signup function to send signup POST reqs, any errors, isloading state]
export const useSignup = () => {
    const [error,setError] = useState(null);
    const [isloading,setIsloading] = useState(null);
    const {dispatch} = useAuthContext();

    const signup = async (email,password) => {
        setIsloading(true);
        setError(null);
        //sending a request to server to signup a user
        const response = await fetch('/api/users/signup',{method:'POST',
                                                          headers:{'Content-Type':'application/json'},
                                                          body:JSON.stringify({email,password})});
        const json     = await response.json();
        if (!response.ok) {
            setIsloading(false);
            setError(json.error);
        }
        if (response.ok) {
            //if signup of the user is successful on the backend, it will return a object with {email,token}
            //We are going to store {email,token} inside local storage of client browser.
            localStorage.setItem('user',JSON.stringify(json));
            //We are going to dispatch 'LOGIN' action to update global auth state.
            dispatch({type:"LOGIN",payload:json})
            setIsloading(false);
        }
    }
    return {signup,isloading,error};
}