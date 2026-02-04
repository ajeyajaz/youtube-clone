import { MdChevronRight } from "react-icons/md";
import  CircleImage from '../components/CircleImage'

function SubscriptionMenu() {
  const channels = new Array(4).fill(0);

  return (
    <aside>
      <h2 className="sidebar-menu-heading flex items-center hover-eff">
        Subscriptions
        <MdChevronRight className="w-5 h-5" />
      </h2>

      {/* channels */}
      <ul className="flex flex-col">
        {channels.map((c, i) => (
          <li className="sidebar-menu-item flex items-center gap-4 hover-eff">
            <CircleImage
              src={`https://i.pravatar.cc/150?$img=${i}`}
              w={8}
              h={8}
            />
            <span className="line-clamp-1">Demo channel 1</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default SubscriptionMenu;
