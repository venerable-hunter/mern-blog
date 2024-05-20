import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import "./../../App.css"

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom'


function Editpost() {

    const { id } = useParams()
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFile] = useState('')
    const [redirect, setRedirect] = useState(false)


    useEffect(() => {
        fetch(`http://127.0.0.1:3000/post/${id}`).then(response => {
            response.json().then(postinfo => {
                setTitle(postinfo.title)
                setSummary(postinfo.summary)
                setContent(postinfo.content)
            })
        })




    }, [])
   async function updatePost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id)
        if (files?.[0])
             {
            data.set('file', files?.[0])
        }
     const response=  await fetch(`http://127.0.0.1:3000/post`, {
            method: 'PUT',
            body:data,
            credentials:'include',
        })
        if(response.ok){
        setRedirect(true)
        }

    }




    if (redirect) {
        return <Navigate to={`/post/${id}`} />
    }
    return (
        <div id='createpost'>
            <Nav />
            <div classNameName='container '>
                <form className='container text-white mt-5' onSubmit={updatePost}>

                    <div className="mb-3 ">

                        <input type="text" className="form-control" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />

                    </div>
                    <div className="mb-3">

                        <input type="text" className="form-control" id="exampleInputPassword1" placeholder='summary' value={summary} onChange={e => setSummary(e.target.value)} />
                    </div>

                    <div className="mb-3">

                        <input type="file" className="form-control" id="exampleInputPassword1" onChange={e => setFile(e.target.files)} />
                    </div>


                    <div className="mb-3">
                        <ReactQuill style={{ background: 'white', color: 'black' }} value={content} onChange={newValue => setContent(newValue)} />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', background: "#EB5E28" }}>Update Post</button>
                </form>



            </div>
        </div>

    )
}

export default Editpost