import React, { useState } from 'react'
import Nav from '../homepage/Nav'

function Signup() {
  const [username, setusername] = useState('')
  const [userphone, setuserphone] = useState('')
  const [useremail, setuseremail] = useState('')
  const [userpassword, setuserpassword] = useState('')

  async function register(ev){
    ev.preventDefault();
   const  response =await fetch('http://127.0.0.1:3000/register',{
      method: 'POST',
      body:JSON.stringify({username,useremail,userphone,userpassword}),
      headers: {'Content-Type': 'application/json'}
    })

    if(response.status===200)
      {
        alert('registration successfull')

    }else{
      alert('registration failed')
    }

  }



  return (
    <>



      <Nav />
      <form className='container bg-secondary  rounded mt-5 p-5 ' onSubmit={register} >
        <h1 className="text-center">Sign Up</h1>
        <div className="mb-3">


          <label for="validationCustom01" class="form-label">First name</label>
          <input type="text" class="form-control" placeholder='john doe' value={username} onChange={ev => setusername(ev.target.value)} required />

          <label for="validationCustom01" class="form-label">Phone Number </label>
          <input type="number" class="form-control" id="validationCustom01" value={userphone} onChange={ev => setuserphone(ev.target.value)} required />


          <label for="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={useremail} onChange={ev => setuseremail(ev.target.value)} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" value={userpassword} onChange={ev => setuserpassword(ev.target.value)} />
        </div>

        <button  style={{width:'100%',background:"#EB5E28"}} type="submit" className="btn btn-primary" >Submit</button>
      </form>

    </>
  )
}

export default Signup