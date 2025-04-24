import { TypeCard } from "../page/collection/type";
export const filterBySet = (
  cards: TypeCard[],
  selectedSet: string | null
): TypeCard[] => {
  if (!selectedSet) return cards;
  return cards.filter((card) => card.cardSet === selectedSet);
};
