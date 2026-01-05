import { ListChecks } from "lucide-react";
import DelTask from "./ui/del-task";
import { Tasks } from "@/generated/prisma/client";

type TaskProgressProps = {
  completedCount: number;
  taskList: Tasks[];
  clearCompletedTasks: () => Promise<void>;
};

const TaskProgress = ({
  completedCount,
  taskList,
  clearCompletedTasks,
}: TaskProgressProps) => {
  return (
    <div className="flex justify-between mt-4">
      <div className="flex gap-2 items-center">
        <ListChecks size={18} />
        <p className="text-xs">
          Tarefas concluidas {completedCount}/{taskList.length}
        </p>
      </div>

      <DelTask clearCompletedTasks={clearCompletedTasks} completedCount={completedCount} />
    </div>
  );
};

export default TaskProgress;
