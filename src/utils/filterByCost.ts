import { TypeCard } from "../page/collection/type";

export const filterCardsByCost = (
  cards: TypeCard[],
  cost: number | string
): TypeCard[] => {
  if (cost === "all") {
    return cards;
  }
  const costNumber = typeof cost === "string" ? Number(cost) : cost;

  if (costNumber !== 8) {
    return cards.filter((card) => card.cost === costNumber);
  }

  return cards.filter((card) => card.cost >= 8);
};
