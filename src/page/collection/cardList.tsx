import { NoCards } from "../../components/shared/noCards";
import { Skeleton } from "../../components/shared/skeleton";
import { Card } from "./card";
import { TypeCard } from "./type";

type ChildProps = {
  loading: boolean;
  filteredCards: TypeCard[];
};

export function CardList({ loading, filteredCards }: ChildProps) {
  return (
    <div>
      {loading ? (
        <Skeleton />
      ) : filteredCards.length > 0 ? (
        <div className="flex mx-auto">
          <div className="mx-auto flex flex-wrap justify-center gap-4 w-full">
            {filteredCards.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </div>
        </div>
      ) : (
        <NoCards />
      )}
    </div>
  );
}
