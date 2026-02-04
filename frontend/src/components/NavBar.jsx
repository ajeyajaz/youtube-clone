import youtubeLogo from "../assets/youtube-logo.svg";
import { FiMenu } from "react-icons/fi";

function NavBar({setExpandSidebar}) {
  return (
    <div className="flex py-3">
        <FiMenu className="hidden w-10 h-10 hover-eff rounded-full p-2 lg:block" onClick={()=> setExpandSidebar()}/>
        <img src={youtubeLogo} alt="youtube-logo" />
        <p>search</p>   
      </div>
  );
}

export default NavBar;
