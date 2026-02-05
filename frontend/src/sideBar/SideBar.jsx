import CollpasedSidebar from "./CollpasedSidebar";
import ExpandedSidebar from "./ExpandedSidebar";

function SideBar({isSidebarExpanded}) {
  return(
    <section className="fixed top-17 left-0 z-50">
      {isSidebarExpanded ? <ExpandedSidebar/> :  <CollpasedSidebar/>}
    </section>
  )
}

export default SideBar;
