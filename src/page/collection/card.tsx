import { Button } from "../../components/shared/button";
import { ROUTES } from "../../constants/route";
import { TypeCard } from "./type";
import { NavLink } from "react-router-dom";

type ChildProps = {
  card: TypeCard;
};
export function Card({ card }: ChildProps) {
  return (
    <div className="relative">
      <NavLink
        to={ROUTES.hearthstoneCard.replace(
          ":cardName",
          encodeURIComponent(card.name)
        )}
      >
        <div
          key={card.cardId}
          className="flex flex-col items-center cursor-pointer"
        >
          <img
            src={card.img}
            alt={card.name}
            className="w-[200px] hover:scale-105 transition duration-300"
          />
          <p>{card.name}</p>
        </div>
      </NavLink>
      <div className="absolute  right-0 top-0 mr-3 mt-3 ">
        <Button text={"+"} />
      </div>
    </div>
  );
}
