import { useState } from "react"
import { useNoteContext } from "../hooks/useNoteContext";
import {useAuthContext} from '../hooks/useAuthContext';
const NoteForm = () => {
    const [title,setTitle] = useState('');
    const [body,setBody]   = useState('');
    const [error,setError] = useState(null);

    const {user}           = useAuthContext();

    const {dispatch}       = useNoteContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //Don't at all run the code from Line 21 if no user is logged in:
        if (!user) {
            setError('You must be logged in!')
            return ;
        }

        const new_note = {title,body};
        const resp     = await fetch('/api/notes',{method:"POST",
                                                   body:JSON.stringify(new_note),
                                                   headers:{'Content-Type':'application/json','Authorization':`Bearer ${user.token}`}});
        const json     = await resp.json();
        if(!resp.ok){
            setError(json.error);
        }
        if(resp.ok){
            setError(null);
            console.log('new note added!')
            setTitle('');
            setBody('');
            dispatch({type:'CREATE_NOTE',payload:json});
        }
    }

    return (
        <form className="new_note" onSubmit={handleSubmit}>
            <h2>Add a new note:</h2>
            <label>Title:</label>
            <input type="text" onChange = {e=>{setTitle(e.target.value)}} value={title}/>
            <label>Body:</label>
            <textarea onChange={e=>{setBody(e.target.value)}} value={body} rows='4'/>
            <button type='submit' style={{width:"50px",borderRadius:"3px"}}><span className="material-symbols-outlined">save</span></button>
            {error && <div>{error}</div>}
        </form>
    )
}

export default NoteForm;