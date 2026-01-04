import { Check, CircleEllipsis, List } from "lucide-react";
import { Badge } from "./ui/badge";

export type FilterType = "all" | "completed" | "pending";

type FilterProps = {
  currentFilter: FilterType;
  setCurrentFilter: React.Dispatch<React.SetStateAction<FilterType>>;
};

const Filter = ({ currentFilter, setCurrentFilter }: FilterProps) => {
  return (
    <div className="flex gap-2">
      <Badge
        className="cursor-pointer"
        variant={`${currentFilter === "all" ? "default" : "outline"}`}
        onClick={() => setCurrentFilter("all")}
      >
        <List /> Todos
      </Badge>
      <Badge
        className="cursor-pointer"
        variant={`${currentFilter === "pending" ? "default" : "outline"}`}
        onClick={() => setCurrentFilter("pending")}
      >
        <CircleEllipsis /> Não finalizados
      </Badge>
      <Badge
        className="cursor-pointer"
        variant={`${currentFilter === "completed" ? "default" : "outline"}`}
        onClick={() => setCurrentFilter("completed")}
      >
        <Check />
        Concluidos
      </Badge>
    </div>
  );
};

export default Filter;
