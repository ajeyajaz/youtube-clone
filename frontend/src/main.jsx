import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import RegisterPage from './auth/RegisterPage'
import LoginPage from './auth/LoginPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './redux/store'
import { Provider } from 'react-redux'
import VideoGrid from './components/VideoGrid'
import EmptyAuthState from './components/EmptyAuthState'
import Profile from './profile/Profile'
import ChannelPage from './channel/ChannelPage.jsx'
import WatchVideoPage from './pages/VideoPage.jsx'
import AuthInitializer from './auth/AuthInitializer.jsx'

const router = createBrowserRouter([
    {
     path: '/',
     element: <App/>,
     children: [
      { index: true, element: <VideoGrid/>},
      {path: 'feed/you', element: <EmptyAuthState/>},
      {path: 'profile', element: <Profile/> },
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
    { path: '*', element: <EmptyAuthState/>}
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
