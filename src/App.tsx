import NavBar from "./components/navbar";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./page/home";
import Favorites from "./page/favorites";
import Collection from "./page/collection";
import History from "./page/history";

function App() {
  return (
    <div>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  );
}
export default App;
