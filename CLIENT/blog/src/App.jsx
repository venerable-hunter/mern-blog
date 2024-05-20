
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Homepage from './components/homepage/homepage';
import Login from './components/authentication/Login';

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
    element: <Homepage/>,
  },
]);

function App() {
  

  return (<>
     <RouterProvider router={router} />
  

  </>
   
  )
}

export default App



  