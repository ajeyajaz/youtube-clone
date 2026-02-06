import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import RegisterPage from './auth/RegisterPage'
import LoginPage from './auth/LoginPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './redux/store'
import { Provider } from 'react-redux'


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
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
