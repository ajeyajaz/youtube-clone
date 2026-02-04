import NavBar from "./components/NavBar";
import VideoGrid from "./components/VideoGrid";
import SideBar from "./components/SideBar";

function App() {
  return (
    <div className="layout">
      <div className="nav">
        <NavBar />
      </div>
      <div className="main">
          <VideoGrid/>
      </div>
      <div className="sidebar">
        <SideBar/>
      </div>
    </div>
  );
}

export default App;
