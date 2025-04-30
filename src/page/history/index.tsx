import { useDispatch, useSelector } from "react-redux";
import { clearHistory, setSearchHistory } from "./searchSlice";
import type { RootState, AppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ROUTES } from "../../constants/route";
import { Button } from "../../components/shared/button";

export function History() {
  const dispatch = useDispatch<AppDispatch>();
  const searchHistory = useSelector((state: RootState) => state.search.history);

  const navigate = useNavigate();
  const { state } = useContext(AuthContext);

  useEffect(() => {
    if (!state.isAuthenticated) {
      navigate(ROUTES.signin);
    } else {
      const userLogin = state.user?.login ?? "guest";
      dispatch(setSearchHistory(userLogin));
    }
  }, [state.isAuthenticated, navigate, dispatch, state.user]);

  const handleClearHistory = () => {
    dispatch(clearHistory());
  };

  const handleSearchClick = (query: string) => {
    navigate(`${ROUTES.collection}?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col gap-3">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        История поисковых запросов
      </h2>

      <Button
        onClick={handleClearHistory}
        text={"Очистить историю"}
        color={"bg-red-400"}
      />

      {searchHistory.length > 0 ? (
        <ul className="space-y-2">
          {searchHistory.map((item) => (
            <li
              key={item}
              onClick={() => handleSearchClick(item)}
              className="bg-white shadow-md p-3 rounded-md hover:bg-gray-100 cursor-pointer transition duration-200"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">История пуста</p>
      )}
    </div>
  );
}
