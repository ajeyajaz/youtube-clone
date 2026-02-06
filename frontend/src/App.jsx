import { useState } from "react";
import Header from "./components/Header";
import SideBar from "./sideBar/SideBar";
import { Outlet } from "react-router-dom";

function App() {
  const [expandSidebar, setExpandSidebar] = useState(false);
  return (
    <>
      <Header
        setExpandSidebar={() => setExpandSidebar((prev) => !prev)}
        isSidebarExpanded={expandSidebar}
      />
      <SideBar isSidebarExpanded={expandSidebar} />
     
      <main className={`mt-34 mb-15 ${expandSidebar ? "md:ml-50" : "md:ml-25"}`}>
          <Outlet/>
      </main>
    </>
  );
}

export default App;
