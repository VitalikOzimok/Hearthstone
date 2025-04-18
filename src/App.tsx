import "./App.css";
import { NavBar } from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants/route";
import { Home } from "./page/home";
import { Favorites } from "./page/favorites";
import { Collection } from "./page/collection";
import { History } from "./page/history";
import { HearthstoneCard } from "./page/hearthstoneCard";
import { SignIn } from "./page/signin";
import { SignUp } from "./page/signup";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.favorites} element={<Favorites />} />
        <Route path={ROUTES.collection} element={<Collection />} />
        <Route path={ROUTES.history} element={<History />} />
        <Route path={ROUTES.hearthstoneCard} element={<HearthstoneCard />} />
        <Route path={ROUTES.signin} element={<SignIn />} />
        <Route path={ROUTES.signup} element={<SignUp />} />
      </Routes>
    </AuthProvider>
  );
}
export default App;
