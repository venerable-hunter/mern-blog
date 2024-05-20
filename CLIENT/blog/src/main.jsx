import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Homepage from './components/homepage/homepage.jsx';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup.jsx';
import { UserContextProvider } from './components/homepage/UserContext.jsx';
import CreatePost from './components/blog-view/CreatePost.jsx';
import Viewpost from './components/homepage/Viewpost.jsx';
import Editpost from './components/homepage/Editpost.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage/>,
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
  {
    path: "/createPost",
    element: <CreatePost/>
  },
  {
    path: "post/:id",
    element: <Viewpost/>,
  },
  {
    path:"edit/:id",
    element:<Editpost/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
    <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>,
)
