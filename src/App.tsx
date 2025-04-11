import "./App.css";
import { NavBar } from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants/route";
import { Home } from "./page/home";
import { Favorites } from "./page/favorites";
import { Collection } from "./page/collection";
import { History } from "./page/history";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.favorites} element={<Favorites />} />
        <Route path={ROUTES.collection} element={<Collection />} />
        <Route path={ROUTES.history} element={<History />} />
      </Routes>
    </div>
  );
}
export default App;
