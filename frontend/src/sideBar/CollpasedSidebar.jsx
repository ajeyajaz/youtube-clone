import { CiYoutube } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { TbBrandYoutubeKids as YoutubeShorts } from "react-icons/tb";
import UploadBotton from "../video/UploadBotton";
import UserButton from "../components/UserButton";
import { Link } from "react-router-dom";

function CollpasedSidebar() {
  return (
    <section className="flex justify-between items-center gap-2 md:flex-col">
      {/* home */}
      <Link className="sidebar-collapased-item hover-eff" to="/">
        <GoHome className="sidebar-logo" />
        Home
      </Link>
      {/* shorts */}
      <div className="sidebar-collapased-item hover-eff">
        <YoutubeShorts className="sidebar-logo" />
        Shorts
      </div>
      {/* uploaad */}
      <div className="md:hidden">
        <UploadBotton />
      </div>
      {/* subscription */}
      <div className="sidebar-collapased-item hover-eff">
        <CiYoutube className="sidebar-logo" />
        Subscriptions
      </div>
      {/* user */}
      <div className="sidebar-collapased-item">
        <UserButton />
      </div>
    </section>
  );
}

export default CollpasedSidebar;
