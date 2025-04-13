import { TypeCard } from "../page/collection/type";

export const filterCardsByCost = (
  cards: TypeCard[],
  cost: number
): TypeCard[] => {
  if (cost !== 8) {
    return cards.filter((card) => card.cost === cost);
  }
  return cards.filter((card) => card.cost >= 8);
};
