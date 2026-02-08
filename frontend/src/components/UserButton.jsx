import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {CREATOR_ROLE,USER_ROLE} from '../constants'

export default function UserButton() {

  const {user, isAuthenticated} = useSelector(state => state.auth);
  const navigate = useNavigate();

  console.log('user handle', user.channel.handle)

  const handleClick = () => {
    console.log('handle clicked.')
    console.log('user', user, CREATOR_ROLE, isAuthenticated)
    if(isAuthenticated){
        if(user.role === USER_ROLE)
            return navigate('/profile');

        if(user.role === CREATOR_ROLE){
          return navigate(`/channel/${user?.channel?.handle}`);
        }
      
    }
  }
  
  return (
      <button
        onClick={handleClick}
        to='/profile'
        aria-label="User menu"
        className="
        w-9 h-9
        rounded-full
        overflow-hidden
        border border-neutral-700
        hover-eff
        transition
      "
      >
        <img
          src={
            user?.avatar?.url ||
            `https://ui-avatars.com/api/?name=${user?.userName}&size=128&background=0f0f0f&color=ffffff`
          }
          alt="User avatar"
          className="w-full h-full object-cover"
        />
      </button>
  );
}
