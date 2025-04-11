import { useEffect, useState } from "react";
import { FilterByMana } from "./filterByMana";
import { CardList } from "./cardList";
import { HeroItem } from "./heroItem";
import { Card } from "./type";

export function Collection() {
  const [cards, setCards] = useState<Card[]>([]); //все карты
  const [filteredCards, setFilteredCards] = useState<Card[]>([]); // карты отфильтрованные по затрате маны
  const [hero, setHero] = useState<string[]>([]); // массив героев который получаем с api
  const [filterByHero, setFilterByHero] = useState<string>("Druid"); //  герой по умолчанию
  const [idByCost, setIdByCost] = useState<number>(1); // айди затрата маны
  const [loading, setLoading] = useState(true);
  const [selectedHero, setSelectedHero] = useState(filterByHero);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(
          `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/classes/${filterByHero}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com",
              "x-rapidapi-key":
                "969eab551bmsh9717eccfd67bee0p16fb0bjsnf691a0441e9f",
            },
          }
        );

        const data = await response.json();
        const cardsWithImages = data.filter(
          (card: Card) =>
            card.img && card.type != "Hero Power" && card.type != "Hero"
        ); // только те, у кого есть картинка
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
    console.log(cards);
  });

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch(
          "https://omgvamp-hearthstone-v1.p.rapidapi.com/info",
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com",
              "x-rapidapi-key":
                "969eab551bmsh9717eccfd67bee0p16fb0bjsnf691a0441e9f",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const res = data.classes.filter(
          (item: string) => item != "Dream" && item != "Whizbang"
        );
        setHero(res);

        console.log("Hearthstone API Data:", data);
      } catch (err) {
        const error = err as Error;
        console.error("Ошибка при получении данных:", error.message);
      }
    };

    fetchInfo();
  }, []);

  useEffect(() => {
    const filtered =
      idByCost !== 8
        ? cards.filter((card) => card.cost === idByCost)
        : cards.filter((card) => card.cost >= 8);
    setFilteredCards(filtered);
  }, [idByCost, cards]);

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
        <CardList loading={loading} filteredCards={filteredCards} />
      </div>
    </div>
  );
}
