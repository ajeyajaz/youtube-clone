import { GoHome } from "react-icons/go";
import { TbBrandYoutubeKids as YoutubeShorts } from "react-icons/tb";
import { Link } from "react-router-dom";

const menu = [
  { label: "Home", icon: GoHome },
  { label: "Shorts", icon: YoutubeShorts },
];

function MainMenu() {
  return (
    <aside className="mb-2">
      {menu.map(({ label, icon: Icon }) => (
        <Link
          className="sidebar-menu-item flex items-center gap-3 hover-eff"
          to="/"
        >
          <Icon className="sidebar-logo" />
          {label}
        </Link>
      ))}
    </aside>
  );
}

export default MainMenu;
