import {
  MdHistory,
  MdPlaylistPlay,
  MdWatchLater,
  MdThumbUp,
  MdVideoLibrary,
  MdDownload
} from "react-icons/md";

const YouMenu = () => {
  const menu = [
    { icon: MdHistory, label: "History" },
    { icon: MdPlaylistPlay, label: "Playlists" },
    { icon: MdWatchLater, label: "Watch later" },
    { icon: MdThumbUp, label: "Liked videos" },
    { icon: MdVideoLibrary, label: "Your videos" },
    { icon: MdDownload, label: "Downloads" }
  ];

  return (
    <aside>
      <h2 className="sidebar-menu-heading hover-eff">You</h2>

      <ul className="space-y-2">
        {menu.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="flex items-center gap-4 sidebar-menu-item hover-eff"
          >
            <Icon size={22} />
            <span className="text-sm">{label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default YouMenu;
