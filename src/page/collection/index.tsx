import { useEffect, useState } from "react";
import { FilterByMana } from "./filterByMana";
import { CardList } from "./cardList";
import { HeroItem } from "./heroItem";
import { TypeCard } from "./type";
import { BASE_URL, CARD_TYPES } from "./constants";
import { filterCardsByCost } from "../../utils/filterByCost";
import { API_HEADERS } from "../hearthstoneCard/constants";
import { useSearchParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import ErrorBoundary from "../../components/shared/ErrorBoundary/ErrorBoundary";

export function Collection() {
  const [cards, setCards] = useState<TypeCard[]>([]);
  const [filteredCards, setFilteredCards] = useState<TypeCard[]>([]);
  const [hero, setHero] = useState<string[]>([]);
  const [filterByHero, setFilterByHero] = useState<string | null>(null);
  const [idByCost, setIdByCost] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  useEffect(() => {
    if (searchQuery) {
      setFilterByHero(capitalizeFirstLetter(searchQuery));
    } else {
      setFilterByHero("Druid");
    }
  }, [searchQuery]);
  useEffect(() => {
    if (!filterByHero) return;
    const fetchCards = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/cards/classes/${filterByHero}`,
          {
            method: "GET",
            headers: API_HEADERS,
          }
        );

        const data = await response.json();
        const cardsWithImages = data.filter(
          (card: TypeCard) =>
            card.img &&
            card.type != CARD_TYPES.HERO_POWER &&
            card.type != CARD_TYPES.HERO
        );
        setCards(cardsWithImages);
        setFilteredCards(cardsWithImages);
      } catch (err) {
        console.error("Ошибка загрузки карт:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [filterByHero]);

  useEffect(() => {
    const fetchInfo = async () => {
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
        setHero(res);
      } catch (err) {
        const error = err as Error;
        console.error("Ошибка при получении данных:", error.message);
      }
    };

    fetchInfo();
  }, []);

  useEffect(() => {
    const filtered = filterCardsByCost(cards, idByCost);
    setFilteredCards(filtered);
  }, [idByCost, cards]);

  useEffect(() => {
    if (searchQuery) {
      if (searchQuery) {
        setFilterByHero(capitalizeFirstLetter(searchQuery));
      }
    }
  }, [searchQuery]);

  return (
    <div className="flex bg-amber-100">
      <div className="py-8 ">
        <HeroItem
          hero={hero}
          setFilterByHero={setFilterByHero}
          setLoading={setLoading}
          filterByHero={filterByHero}
        />
      </div>
      <div className="flex flex-col items-center pt-5">
        <FilterByMana setIdByCost={setIdByCost} idByCost={idByCost} />
        <ErrorBoundary
          fallback={
            <div>
              Не удалось отобразить список карт. Пожалуйста, обновите страницу
            </div>
          }
        >
          <CardList loading={loading} filteredCards={filteredCards} />
        </ErrorBoundary>
      </div>
    </div>
  );
}
