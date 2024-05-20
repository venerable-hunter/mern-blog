
import Nav from "./Nav";
import "./../../App.css"
import Posts from "./Posts";
import { useEffect, useState } from "react";

export default function Homepage() {

  const [posts, setPosts] = useState('')
  useEffect(() => {
    fetch('http://127.0.0.1:3000/post').then(response => {
      response.json().then(postdata => {
        setPosts(postdata)
      })
    })
  }, [])



  return (
    <>
      <Nav />
      {/* Here is the code for list of articles on website */}



      {posts.length >0 && posts.map(post=>(
        <Posts {...post}/>
      )) }

      {/* <Posts /> */}

    </>
  )
}

