import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function SeacrhInput() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery) {
      navigate("/collection", { state: searchQuery });
      setSearchQuery("");
    }
  };

  return (
    <div className="flex rounded-2xl flex-1 justify-between relative h-11 z-30">
      <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
      <input
        className="rounded-full outline-none w-full  bg-gray-100 pl-11"
        type="text"
        placeholder="Найти ..."
        value={searchQuery}
        onKeyDown={handleSearch}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}
