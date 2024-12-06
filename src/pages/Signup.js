import { useState } from "react"
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {signup,error,isloading} = useSignup();

    const handleSignup = async (e) => {
        e.preventDefault();
        await signup(email,password);
    }

    return (
        <form className="signup" onSubmit={handleSignup}>
            <h3>Signup:</h3>
            <label>Email</label>
            <input type='email' onChange={e=>{setEmail(e.target.value)}} value={email}/>
            <label>Password</label>
            <input type='password' onChange={e=>{setPassword(e.target.value)}} value={password}/>
            <button type='submit' disabled={isloading}>Sign Up</button>
            {!isloading || <div>Please wait. The server is spinning up. Response will be slow.😿</div>}
            {error && <div className="error">{error}</div>}
        </form>
    )
};

export default Signup;