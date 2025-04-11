import { useEffect, useState } from "react";
import Mage from "../../assets/classes/Mage.png";
import Neutral from "../../assets/classes/Neutral.png";
import Unknow from "../../assets/classes/unknow.jpg";
interface Card {
  cardId: string;
  name: string;
  type: string;
  race?: string;
  cardSet?: string;
  [key: string]: any;
}
export function Collection() {
  const [cards, setCards] = useState<Card[]>([]); //все карты
  const [filteredCards, setFilteredCards] = useState<Card[]>([]); // карты отфильтрованные по затрате маны
  const [hero, setHero] = useState<string[]>([]); // массив героев который получаем с api
  const [filterByHero, setFilterByHero] = useState<string>("Druid"); //  герой по умолчанию
  const [idByCost, setIdByCost] = useState<number>(1); // айди затрата маны
  const [loading, setLoading] = useState(true);
  const heroImages: Record<string, string> = {
    Mage,
    Neutral,
  };
  const costOptions = [1, 2, 3, 4, 5, 6, 7, 8];

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
    <div className="flex">
      <div className="py-3 mt-7 flex flex-col gap-10 ">
        {hero.map((item, id) => (
          <div
            key={id}
            className="flex items-center justify-between bg-amber-200 h-20 cursor-pointer hover:scale-105 transition duration-300 min-w-[275px] "
            onClick={() => {
              setFilterByHero(item);
              setLoading(true);
            }}
          >
            <h1 className="text-nowrap ml-8 text-lg text-zinc-700 font-sans">
              {item}
            </h1>
            <div className="flex-shrink-0 ">
              <img
                src={heroImages[item] || Unknow}
                alt=""
                className="h-30 w-35"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center pt-5">
        <div className="flex gap-1">
          {costOptions.map((item) => (
            <button
              onClick={() => {
                setIdByCost(item);
              }}
              className="rounded-full p-2  bg-blue-300"
            >
              {item != 8 ? `${item}` : `${item}+`}
            </button>
          ))}
        </div>
        {!loading ? (
          <div className="flex mx-auto ">
            <div className="  mx-auto flex flex-wrap justify-center gap-4 w-full">
              {filteredCards.map((card) => (
                <div key={card.cardId} className="flex flex-col items-center">
                  <img src={card.img} alt={card.name} className="w-[200px]" />
                  <p>{card.name}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-sm transition duration-700">
            <div className="flex flex-col items-center gap-4 animate-fade-in">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-lg text-gray-700 font-semibold">
                Загрузка данных...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
