import CollpasedSidebar from "./CollpasedSidebar";
import ExpandedSidebar from "./ExpandedSidebar";

function SideBar({ isSidebarExpanded }) {
  return (
    <section className="fixed bg-[#0f0f0f] z-45 bottom-0 left-0  w-full md:w-auto md:top-18">
      {isSidebarExpanded ? <ExpandedSidebar /> : <CollpasedSidebar />}
    </section>
  );
}

export default SideBar;
