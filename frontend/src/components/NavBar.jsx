import youtubeLogo from "../assets/youtube-logo.svg";
import { FiMenu } from "react-icons/fi";
import SearchBox from "./SearchBox";
import CreateButton from "./CreateBotton";
import VoiceButton from "./VoiceBotton";
import UserButton from "./UserButton";

function NavBar({ setExpandSidebar }) {
  return (
    <div className="flex justify-between gap-2">
      <div className="flex gap-3">
        <FiMenu
          className="hidden w-10 h-10 hover-eff rounded-full p-2 lg:block"
          onClick={() => setExpandSidebar()}
        />
        <div className="max-w-max w-20  md:w-25">
          <img src={youtubeLogo} alt="youtube-logo" className="w-full h-full object-contain"/>
        </div>
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
        <CreateButton />
        <UserButton />
      </div>
    </div>
  );
}

export default NavBar;
