import { useState } from "react";
import { useNoteContext } from "../hooks/useNoteContext";
import { useAuthContext } from "../hooks/useAuthContext";

const NoteDetails = ({nt}) => {

    const [title,setTitle] = useState(nt.title);
    const [body,setBody]   = useState(nt.body);

    const [error,setError] = useState(null);

    const {dispatch} = useNoteContext();

    const {user}     = useAuthContext();

    const handleDel = async () => {
        if (!user) {
            setError("You must be logged in")
            return;
        }
        const resp = await fetch('/api/notes/'+nt._id,{method:'DELETE',headers:{'Authorization':`Bearer ${user.token}`}});
        const json = await resp.json();
        if(resp.ok){
            dispatch({type:"DELETE_NOTE",payload:json})
        }
    };


    const handleUpdate  = async () => {
        if (!user) {
            setError("You must be logged in");
            return;
        }
        const update_n = {_id:nt._id,title,body};
        const resp     = await fetch(`/api/notes/${nt._id}`,{method:"PATCH",body:JSON.stringify(update_n),headers:{'Content-Type':'application/json','Authorization':`Bearer ${user.token}`}});
        const json     = await resp.json();
        if(!resp.ok){
             setError(json.error);
        }
        if(resp.ok){
            setError(null);
            document.querySelector(`#updateBtn${nt._id}`).style.display = 'none'
            dispatch({type:'UPDATE_NOTE',payload:update_n});
        }
    }

    return (
        <div className='nt_det'>
            <input type='text' onChange={e=>{document.querySelector('#updateBtn'+nt._id).style.display='inline-block';setTitle(e.target.value)}} value={title}/><br/>
            <textarea onChange={e=>{document.querySelector('#updateBtn'+nt._id).style.display='inline-block';setBody(e.target.value)}} value={body}/><br/>
            <button onClick={handleDel} className="del_note_btn"><span className="material-symbols-outlined">delete</span></button>
            <button id={`updateBtn${nt._id}`} onClick={handleUpdate} style={{display:'none',width:"50px",borderRadius:'3px'}}><span className="material-symbols-outlined">update</span></button>
            {error && <div className="error">{error}</div>}
        </div>
    )
}

export default NoteDetails;