import youtubeLogo from "../assets/youtube-logo.svg";
import { FiMenu } from "react-icons/fi";
import SearchBox from "./SearchBox";
import UploadBotton from "../video/UploadBotton";
import VoiceButton from "./VoiceBotton";
import UserButton from "./UserButton";
import SignInButton from "./SignInButton";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function NavBar({ setExpandSidebar }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="flex justify-between gap-2">
      <div className="flex gap-3">
        <FiMenu
          className="hidden w-10 h-10 hover-eff rounded-full p-2 lg:block"
          onClick={() => setExpandSidebar()}
        />
        <Link className="max-w-max w-20  md:w-25" to="/">
          <img
            src={youtubeLogo}
            alt="youtube-logo"
            className="w-full h-full object-contain"
          />
        </Link>
      </div>

      {/* mobile */}
      <div className="flex gap-2 flex-1 sm:hidden">
        <SearchBox />
      </div>

      {/* Desktop / Tablet Search */}
      <div className="hidden gap-3 flex-1 max-w-150 sm:flex">
        <SearchBox />
        <VoiceButton />
      </div>

      <div className="hidden gap-3 sm:flex">
        <UploadBotton />
        {isAuthenticated ? <UserButton /> : <SignInButton />}
      </div>
    </div>
  );
}

export default NavBar;
