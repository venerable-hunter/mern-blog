import React, { useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import "./../../App.css"
import { UserContext } from './UserContext';

function Nav() {
  // const [username, setusername]= useState(null);
  const {setuserInfo,userInfo} = useContext(UserContext)

  useEffect(()=>{
    fetch('http://127.0.0.1:3000/profile',{
      credentials:'include',
    }).then(response=>{
      response.json().then(userInfo=>{
       setuserInfo(userInfo);
       

      })
    })

  },[])

  function logout(){
    fetch('http://127.0.0.1:3000/logout',{
      method: 'POST',
      credentials: 'include',
    })
    setuserInfo(null);

  }
 const username = userInfo?.username


  return (
    
    <nav className="navbar navbar-expand-lg  rounded-bottom shadow-sm">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">MERNBLOG</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
          </li>

          {username && (
            <>
            <li className="nav-item">
            <Link className="nav-link" to="/createpost">Create New Post</Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={logout}>Logout  {`"${username}"`}</a>
          {/* <Link className="nav-link" to="/signup">Logout {`"${username}"`}</Link> */}
          </li>
            
            </>
          )}

          {!username && (
            <>
            <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link" to="/signup">Sign up</Link>
          </li>
            
            </>
          )}
          
         
         
          
        </ul>
        
      </div>
    </div>
  </nav>
  
  )
}

export default Nav