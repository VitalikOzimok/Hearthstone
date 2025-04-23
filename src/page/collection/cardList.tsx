import { Loader } from "../../components/shared/loader";
import { Card } from "./card";
import { TypeCard } from "./type";
type ChildProps = {
  loading?: boolean;
  filteredCards: TypeCard[];
};
export function CardList({ loading, filteredCards }: ChildProps) {
  return (
    <div>
      {!loading ? (
        <div className="flex mx-auto ">
          <div className="  mx-auto flex flex-wrap justify-center gap-4 w-full">
            {filteredCards.map((card) => (
              <Card card={card} />
            ))}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
