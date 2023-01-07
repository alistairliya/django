import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Error from './components/Error';
import About from './components/About';
import Login from './components/Login';
import { HomeLayout } from './components/HomeLayout';
import {ProtectedLayout} from './components/ProtectedLayout';
import Dashboard  from './pages/Dashboard';
import { ProtectedRoute } from "./components/ProtectedRoute";
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "./hooks/useAuth";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    //path: "/",
    element: <AuthProvider><App /></AuthProvider>,
    errorElement: <Error />,
    children:[
      {
        path:'/',
        element:<HomeLayout />,
        children: [
          {
            path:'login',
            element: <Login />
          },
        ]
      },
      {
        path:"dashboard",
        element:<ProtectedRoute><ProtectedLayout/></ProtectedRoute>,
        children:[
          {
            path:'',
            element:<Dashboard/>,
            children:[
              {
                path:"about",
                element:<About/>
              }
            ]
          }
        ]
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
