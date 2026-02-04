import { GoHome } from "react-icons/go";
import { TbBrandYoutubeKids as YoutubeShorts } from "react-icons/tb";

const menu = [
  { label: "Home", icon: GoHome },
  { label: "Shorts", icon: YoutubeShorts },
];

function MainMenu() {
  return (
    <aside className="mb-2">
      {menu.map(({label, icon: Icon}) => (
        <div className="sidebar-menu-item flex items-center gap-3 hover-eff">
          <Icon  className="sidebar-logo" />
            {label}
        </div>
      ))}
    </aside>
  );
}

export default MainMenu;
