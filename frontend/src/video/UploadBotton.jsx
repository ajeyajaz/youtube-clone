import { GoPlus } from "react-icons/go";
import VideoUploadModal from "./VideoUploadModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {CREATOR_ROLE} from '../constants'

export default function CreateButton() {
  const [onClick, setOnclick] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleOnClick = ()=> {
      if(!isAuthenticated)
          return navigate('users/login');
      if(user.role !== CREATOR_ROLE)
          return navigate('/profile') // to create channel
      setOnclick(true) // show video upload form
  } 

  return (
    <>
      <button
        onClick={handleOnClick}
        className="
        justify-center items-center gap-2
        px-4 h-9
        rounded-full
        border border-neutral-700
        text-sm font-medium
        hover-eff
        transition-colors   
        md:flex
      "
      >
        <GoPlus size={18} />
        <span className="hidden text-sm md:inline">Create</span>
      </button>
      {onClick && <VideoUploadModal onClose={() => setOnclick(false)} />}
    </>
  );
}
