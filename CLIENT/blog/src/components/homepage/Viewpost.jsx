import React, { useContext, useEffect, useState } from 'react'
import Nav from './Nav'
import "./../../App.css"
import { Link, useParams } from 'react-router-dom'
import { UserContext } from './UserContext';
function Viewpost() {
    const { id } = useParams()
    console.log(id)
    const [postInfo, setPostInfo] = useState(null)
    useEffect(() => {
        fetch(`http://127.0.0.1:3000/post/${id}`).then(response => {
            response.json().then(postinfo => {
                setPostInfo(postinfo)
            })
        })




    }, [])

    const { userInfo } = useContext(UserContext)
    console.log(userInfo.username)
    // console.log(postInfo.author.name)


    if (!postInfo) return '';

    return (
        <>
            <Nav />
            <div style={{ background: 'white', color: 'black' }}>
                <div className='container mt-4 text-white' >Viewpost
                    <h2 className='text-black pt-3'> {postInfo.title}</h2>

                    <div className='text-black'>Author : {postInfo.author.name}</div>

                    {userInfo.username == postInfo.author.name &&
                        <Link to={`/edit/${postInfo._id}`}> <button type="button " class="btn btn-secondary btn-sm ">Edit post</button>
                        </Link>
                    }
                    <img className='img-fluid pt-5' src={`http://127.0.0.1:3000/${postInfo.cover}`}></img>


                    <div className='text-black pt-5' dangerouslySetInnerHTML={{ __html: postInfo.content }}></div>



                </div>
            </div>
        </>
    )
}

export default Viewpost