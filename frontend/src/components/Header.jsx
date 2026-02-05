import CategoryList from "./CategoryList"
import NavBar from "./NavBar"
function Header({setExpandSidebar, isSidebarExpanded}) {
  return (
    <header className="w-full bg-[#0f0f0f] fixed top-0 lef-0 right-0 z-50 space-y-4 px-6  py-4">
        <NavBar setExpandSidebar={setExpandSidebar}/>
        <div className={isSidebarExpanded ? 'pl-50': 'pl-16'}>
          <CategoryList/>
        </div>
    </header>
  )
}

export default Header