import React, { useState } from 'react'
import Nav from '../homepage/Nav'
import { Navigate } from 'react-router-dom';

function Login() {
  const [email, setemail]=useState('')
  const [password, setpassword]= useState('');
  const [redirect, setredirect]= useState(false)

 async function login(ev){
  ev.preventDefault();
   const response= await fetch('http://127.0.0.1:3000/login',{
      method: 'POST',
      body:JSON.stringify({email,password}),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    });

    if(response.ok)
      {
        setredirect(true);
      }else{
        alert('Wrong Credentials')
      } 
}
if(redirect)
  {
    return <Navigate to={'/'} />
  }

  return (
    <>
    <Nav/>
    <form className='container bg-secondary  rounded mt-5 p-5 ' onSubmit={login} >
      <h1 className="text-center">Login</h1>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={ev=>setemail(ev.target.value)} required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"  value={password} onChange={ev=>setpassword(ev.target.value)}/>
  </div>
  
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </>
  )
}

export default Login