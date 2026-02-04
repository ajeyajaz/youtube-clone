import { CiYoutube } from "react-icons/ci";
import { GoHome, GoPlusCircle } from "react-icons/go";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { TbBrandYoutubeKids as YoutubeShorts } from "react-icons/tb";

function SideBar() {
  return (
    <div className="flex justify-between items-center gap-5 p-2 md:flex-col">
      {/* home */}
      <div className="logo-container">
        <GoHome className="sidebar-logo" />
        Home
      </div>
      {/* shorts */}
      <div className="logo-container">
        <YoutubeShorts className="sidebar-logo" />
        Shorts
      </div>
      {/* uploaad */}
      <GoPlusCircle className="sidebar-logo md:hidden" />
      {/* subscription */}
      <div className="logo-container">
        <CiYoutube className="sidebar-logo" />
        Subscriptions
      </div>
      {/* user */}
      <div className="logo-container">
        <HiOutlineUserCircle className="sidebar-logo" />
        You
      </div>
    </div>
  );
}

export default SideBar;
