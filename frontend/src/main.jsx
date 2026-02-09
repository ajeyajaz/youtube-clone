import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import RegisterPage from './auth/RegisterPage'
import LoginPage from './auth/LoginPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './redux/store'
import { Provider } from 'react-redux'
import VideoGrid from './video/VideoGrid'
import ChannelPage from './channel/ChannelPage'
import WatchVideoPage from './video/VideoPage'
import AuthInitializer from './auth/AuthInitializer'
import UserProfile from './profile/UserProfile.jsx'

const router = createBrowserRouter([
    {
     path: '/',
     element: <App/>,
     children: [
      { index: true, element: <VideoGrid/>},
      {path: 'profile', element: <UserProfile/> },
      {path: 'channel/:handle', element: <ChannelPage/>},
     ]
    },
    {
      path: '/users/register',
      element: <RegisterPage/>
    },
    {
      path: '/users/login',
      element: <LoginPage/>
    },
    {
      path: "/videos/:videoId", 
      element:<WatchVideoPage />
    },
  ]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthInitializer>
        <RouterProvider router={router}/>
      </AuthInitializer>
    </Provider>
  </StrictMode>,
)
