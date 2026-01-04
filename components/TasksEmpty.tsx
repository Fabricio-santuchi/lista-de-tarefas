import { Tasks } from "@/generated/prisma/client";
import { FilterType } from "./filter";

type TasksEmptyProps = {
  currentFilter: FilterType;
  taskList: Tasks[];
  filteredTasks: Tasks[];
};

const TasksEmpty = ({
  currentFilter,
  taskList,
  filteredTasks,
}: TasksEmptyProps) => {
  return (
    <>
      {currentFilter === "all" && taskList.length === 0 && (
        <div className="text-xs mt-4 pt-4 pb-1 border-t text-center text-gray-500">
          Nenhuma tarefa cadastrada
        </div>
      )}

      {currentFilter === "pending" && filteredTasks.length === 0 && (
        <div className="text-xs mt-4 pt-4 pb-1 border-t text-center text-gray-500">
          Nenhuma tarefa pendente
        </div>
      )}

      {currentFilter === "completed" && filteredTasks.length === 0 && (
        <div className="text-xs mt-4 pt-4 pb-1 border-t text-center text-gray-500">
          Nenhuma tarefa concluída
        </div>
      )}
    </>
  );
};

export default TasksEmpty;
