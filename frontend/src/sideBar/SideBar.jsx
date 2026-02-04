import CollpasedSidebar from "./CollpasedSidebar";
import ExpandedSidebar from "./ExpandedSidebar";

function SideBar({isSidebarExpanded}) {
  return isSidebarExpanded ? <ExpandedSidebar/> :  <CollpasedSidebar/>
}

export default SideBar;
