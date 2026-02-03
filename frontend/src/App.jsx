import NavBar from "./components/NavBar";
import VideoGrid from "./components/VideoGrid";

function App() {
  return (
    <div className="layout">
      <div className="nav">
        <NavBar />
      </div>
      <div className="main">
          <VideoGrid/>
      </div>
      <div className="sidebar border w-50">sidebar</div>
    </div>
  );
}

export default App;
