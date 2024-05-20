import React from 'react'
import {formatISO9075} from 'date-fns'
import { Link } from 'react-router-dom'


function Posts({_id,title,summary,cover,content,createdAt,author}) {
 
    return (
        <div className="container CARD mt-2 p-2 rounded-2 ">
            <div className="row  ">
                <Link to={`/post/${_id}`} className='col-md-4  rounded'>
                <img style={{ height: "250px" }} className=' rounded' src={'http://127.0.0.1:3000/'+cover} alt="" />
                </Link>
                <div className="col-md-8">
                <Link to={`/post/${_id}`}>
                    <h5> {title}</h5>
                    </Link>
                    <h6>Author: {author.name}  posted on:<time>{formatISO9075(new Date(createdAt))}</time></h6>
                    <p> {summary}</p>
                </div>
            </div>
        </div>
    )
}

export default Posts