import { useSelector } from "react-redux";
import EmptyAuthState from '../components/EmptyAuthState'
import {USER_ROLE, CREATOR_ROLE} from '../constants'
import UserProfile from "./userProfile";
import CreatorProfile from './CreatorProfile'
import ChannelPage from "../pages/ChannelPage";

function Profile() {
    const {user, isAuthenticated} = useSelector(state => state.auth);
    console.log('user: ', user)

    if(!isAuthenticated) return <EmptyAuthState/>
    if(user.role === USER_ROLE) return <UserProfile/>
    if(user.role === CREATOR_ROLE) return <ChannelPage/> 
}

export default Profile;
