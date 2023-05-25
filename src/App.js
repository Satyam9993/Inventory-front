import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Pages/Home';
import Book from './Pages/Book';
import Login from './Pages/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/book",
    element: <Book />,
  },
  {
    path: "/login",
    element: <Login />,
  }
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App;