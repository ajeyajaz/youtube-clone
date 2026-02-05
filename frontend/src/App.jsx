import { useState } from "react";
import Header from "./components/Header";
import VideoGrid from "./components/VideoGrid";
import SideBar from "./sideBar/SideBar";

function App() {
  const [expandSidebar, setExpandSidebar] = useState(false);

  console.log(`md:${expandSidebar ? 'ml-50' : 'ml-25'}`)

  return (
    <>
      <Header
        setExpandSidebar={() => setExpandSidebar((prev) => !prev)}
        isSidebarExpanded={expandSidebar}
      />
      <SideBar isSidebarExpanded={expandSidebar} />
      <main className= {expandSidebar ? 'md:ml-50' : 'md:ml-25'}>
        <VideoGrid />
      </main>
    </>
  );
}

export default App;
