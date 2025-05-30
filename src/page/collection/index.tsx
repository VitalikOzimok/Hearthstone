import { Suspense, lazy } from "react";
const HeroItem = lazy(() =>
  import("./heroItem").then((module) => ({ default: module.HeroItem }))
);
const FilterBySets = lazy(() =>
  import("./filterBySets").then((module) => ({ default: module.FilterBySets }))
);
const FilterByMana = lazy(() =>
  import("./filterByMana").then((module) => ({ default: module.FilterByMana }))
);

import { useEffect, useState } from "react";
import { CardList } from "./cardList";
import { TypeCard } from "./type";
import { BASE_URL, CARD_TYPES, wrongSets } from "./constants";
import { filterCardsByCost } from "../../utils/filterByCost";
import { filterBySet } from "../../utils/filterBySets";
import { API_HEADERS } from "../hearthstoneCard/constants";
import { useSearchParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import ErrorBoundary from "../../components/shared/ErrorBoundary/ErrorBoundary";
import { deleteWrongSets } from "../../utils/deleteWrongSets";

export function Collection() {
  const [cards, setCards] = useState<TypeCard[]>([]);
  const [filteredCards, setFilteredCards] = useState<TypeCard[]>([]);
  const [hero, setHero] = useState<string[]>([]);
  const [sets, setSets] = useState<string[]>([]);
  const [selectedSet, setSelectedSet] = useState<string>("Perils in Paradise");
  const [filterByHero, setFilterByHero] = useState<string | null>(null);
  const [idByCost, setIdByCost] = useState<number | string>("all");
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  useEffect(() => {
    if (searchQuery) {
      setFilterByHero(capitalizeFirstLetter(searchQuery));
      setLoading(true);
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
          (item: string) =>
            item != CARD_TYPES.DREAM && item != CARD_TYPES.WHIZBANG
        );

        setHero(res);
        const filteredSets = deleteWrongSets(data.sets, wrongSets);
        setSets(filteredSets);
      } catch (err) {
        const error = err as Error;
        console.error("Ошибка при получении данных:", error.message);
      }
    };

    fetchInfo();
  }, []);

  useEffect(() => {
    let filtered = filterCardsByCost(cards, idByCost);
    filtered = filterBySet(filtered, selectedSet);
    setFilteredCards(filtered);
  }, [idByCost, selectedSet, cards]);

  return (
    <div className="flex bg-amber-100">
      <div className="py-8 ">
        <Suspense fallback={<div>Загрузка героев...</div>}>
          <HeroItem
            hero={hero}
            setFilterByHero={setFilterByHero}
            setLoading={setLoading}
            filterByHero={filterByHero}
          />
        </Suspense>
      </div>
      <div className="flex flex-col items-center pt-5 mx-auto">
        <Suspense fallback={<div>Загрузка фильтров...</div>}>
          <div className="flex items-center gap-10">
            <FilterBySets
              sets={sets}
              selectedSet={selectedSet}
              setSelectedSet={setSelectedSet}
            />
            <FilterByMana setIdByCost={setIdByCost} idByCost={idByCost} />
          </div>
        </Suspense>
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
