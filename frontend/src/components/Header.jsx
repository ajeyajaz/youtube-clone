import CategoryList from "./CategoryList"
import NavBar from "./NavBar"
function Header({setExpandSidebar}) {
  return (
    <header className="w-full bg-black/90 backdrop-blur-2xl fixed top-0 lef-0 right-0 z-50 space-y-4 px-3 py-4">
        <NavBar setExpandSidebar={setExpandSidebar}/>
        <CategoryList/>
    </header>
  )
}

export default Header