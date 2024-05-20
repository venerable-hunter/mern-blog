import React, { useState } from 'react'
import "./../../App.css"
import Nav from '../homepage/Nav'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';

function CreatePost(ev) {
    
    
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFile] = useState('')
    const [redirect, setRedirect] = useState(false)
 


async    function createNewPost(ev){
    
    ev.preventDefault()
       const data = new FormData();
       data.set('title', title);
       data.set('summary', summary);
       data.set('content',content);
       data.set('file',files[0])

     const response = await  fetch('http://127.0.0.1:3000/post',{
        method: 'POST',
        body:data,
        credentials:'include',
      });

      if(response.ok){
        setRedirect(true)
      }

    }
    
    if(redirect){
      return  <Navigate to={'/'}/>
    }

    return (
        <div id='createpost'>
            <Nav />
            <div classNameName='container '>
                <form className='container text-white mt-5'onSubmit={createNewPost}>
                   
                    <div className="mb-3 ">


                        <input type="text" className="form-control" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />

                    </div>
                    <div className="mb-3">

                        <input type="text" className="form-control" id="exampleInputPassword1" placeholder='summary' value={summary} onChange={e => setSummary(e.target.value)} />
                    </div>

                    <div className="mb-3">

                        <input type="file" className="form-control" id="exampleInputPassword1"   onChange={e=>setFile(e.target.files)}/>
                    </div>


                    <div className="mb-3">
                        <ReactQuill style={{ background: 'white', color: 'black' }} value={content} onChange={newValue => setContent(newValue)} />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', background: "#EB5E28" }}>Create Post</button>
                </form>



            </div>
        </div>

    )
}

export default CreatePost