import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import RegisterPage from './auth/RegisterPage'
import LoginPage from './auth/LoginPage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter([
    {
      path: '/',
      element: <App/>
    },
    {
      path: '/users/register',
      element: <RegisterPage/>
    },
    {
      path: '/users/login',
      element: <LoginPage/>
    },
  ]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
