import CategoryList from "./CategoryList"
import NavBar from "./NavBar"
function Header({setExpandSidebar, isSidebarExpanded}) {
  return (
    <header className="w-full bg-[#0f0f0f] fixed top-0 lef-0 right-0 z-45 space-y-4 px-1 py-4 md:px-5">
        <NavBar setExpandSidebar={setExpandSidebar}/>
        <div className={isSidebarExpanded ? 'md:ml-50': 'md:ml-26'}>
          <CategoryList/>
        </div>
    </header>
  )
}

export default Header