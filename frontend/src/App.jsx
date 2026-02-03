import NavBar from "./components/NavBar";


function App() {
  return (
    <div className="layout">

      <div className="nav">
          <NavBar/>
      </div>
      <div className="main bg-blue-400">main</div>
      <div className="sidebar bg-cyan-300">sidebar</div>

    </div>
  );
}

export default App;
