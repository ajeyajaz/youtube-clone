import Header from "./components/Header";
import NavBar from "./components/NavBar";
import VideoGrid from "./components/VideoGrid";
import SideBar from "./sideBar/SideBar";
import { useState } from "react";

function App() {
  const [expandSidebar, setExpandSidebar] = useState(false);

  return (
    <div className="layout p-3">
      <div className="nav">
        <Header setExpandSidebar={() => setExpandSidebar(prev => !prev)}/>
      </div>
      <div className="main">
          <VideoGrid/>
      </div>
      <div className="sidebar">
        <SideBar isSidebarExpanded={expandSidebar}/>
      </div>
    </div>
  );
}

export default App;
