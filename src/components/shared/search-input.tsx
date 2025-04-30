import { Loader2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../page/collection/constants";
import { API_HEADERS } from "../../page/hearthstoneCard/constants";
import { ROUTES } from "../../constants/route";
import { KEYS } from "../../constants/keys";
import { addSearchQuery } from "../../page/history/searchSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";

export function SeacrhInput() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    setSuggestions([]);
  }, [location.pathname]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setIsSubmitting(true);
      try {
        const response = await fetch(`${BASE_URL}/info`, {
          method: "GET",
          headers: API_HEADERS,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const res = data.classes.filter(
          (item: string) => item != "Dream" && item != "Whizbang"
        );
        const filteredSuggestions = res.filter((suggestion: string) =>
          suggestion.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setSuggestions(filteredSuggestions);
      } catch (err) {
        const error = err as Error;
        console.error("Ошибка при получении данных:", error.message);
      } finally {
        setIsSubmitting(false);
      }
    };

    const debounceFetch = setTimeout(() => {
      fetchSuggestions();
    }, 500);

    return () => clearTimeout(debounceFetch);
  }, [searchQuery]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === KEYS.enter && searchQuery.trim()) {
      dispatch(addSearchQuery(searchQuery));
      navigate(
        `${ROUTES.collection}?q=${encodeURIComponent(searchQuery.trim())}`
      );
      setSearchQuery("");
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    dispatch(addSearchQuery(suggestion));
    navigate(`${ROUTES.collection}?q=${encodeURIComponent(suggestion)}`);
    setSuggestions([]);
    setSearchQuery("");
  };

  return (
    <div className="relative flex rounded-2xl flex-1 justify-between h-11 z-30">
      <div className="absolute top-1/2 translate-y-[-50%] left-3">
        {isSubmitting ? (
          <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
        ) : (
          <Search className="h-5 w-5 text-gray-400" />
        )}
      </div>
      <input
        className="rounded-full outline-none w-full bg-gray-100 pl-11"
        type="text"
        placeholder="Найти ..."
        value={searchQuery}
        onKeyDown={handleSearch}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {suggestions.length > 0 && (
        <div className="absolute w-full top-full mt-1 bg-white shadow-lg rounded-md z-20">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
