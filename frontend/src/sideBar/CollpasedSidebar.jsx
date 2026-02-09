import { CiYoutube } from "react-icons/ci";
import { GoHome, GoPlusCircle } from "react-icons/go";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { TbBrandYoutubeKids as YoutubeShorts } from "react-icons/tb";
import UploadBotton from '../video/UploadBotton'

function CollpasedSidebar() {
  return (
    <section className="flex justify-between items-center gap-5 md:flex-col">
      {/* home */}
      <div className="sidebar-collapased-item hover-eff">
        <GoHome className="sidebar-logo" />
        Home
      </div>
      {/* shorts */}
      <div className="sidebar-collapased-item hover-eff">
        <YoutubeShorts className="sidebar-logo" />
        Shorts
      </div>
      {/* uploaad */}
      <div className="md:hidden">
        <UploadBotton  />
      </div>
      {/* subscription */}
      <div className="sidebar-collapased-item hover-eff">
        <CiYoutube className="sidebar-logo" />
        Subscriptions
      </div>
      {/* user */}
      <div className="sidebar-collapased-item hover-eff">
        <HiOutlineUserCircle className="sidebar-logo" />
        You
      </div>
    </section>
  );
}

export default CollpasedSidebar;
