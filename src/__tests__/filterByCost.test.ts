import { filterCardsByCost } from "../utils/filterByCost";

const mockCards = [
  { name: "Card 1", cost: 1 },
  { name: "Card 2", cost: 2 },
  { name: "Card 8", cost: 8 },
  { name: "Card 10", cost: 10 },
];

describe("filterCardsByCost", () => {
  it("должен вернуть карты с нужной стоимостью (например, 2)", () => {
    const result = filterCardsByCost(mockCards as any, 2);
    expect(result).toEqual([{ name: "Card 2", cost: 2 }]);
  });

  it("должен вернуть карты с cost >= 8, если передано 8", () => {
    const result = filterCardsByCost(mockCards as any, 8);
    expect(result).toEqual([
      { name: "Card 8", cost: 8 },
      { name: "Card 10", cost: 10 },
    ]);
  });
});
