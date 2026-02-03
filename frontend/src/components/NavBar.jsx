import youtubeLogo from "../assets/youtube-logo.svg";
import { FiMenu } from "react-icons/fi";

function NavBar() {
  return (
    <div className="flex py-3">
        <FiMenu className="w-6 h-6" />
        <img src={youtubeLogo} alt="youtube-logo" />
        <p>search</p>   
      </div>
  );
}

export default NavBar;
