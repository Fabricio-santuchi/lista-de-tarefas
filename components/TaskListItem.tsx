import { Tasks } from "@/generated/prisma/client";
import EditTask from "./edit-task";
import { Trash } from "lucide-react";

type TaskListItemProps = {
  filteredTasks: Tasks[];
  handleToggleTask: (taskId: string) => Promise<void>;
  handleGetTasks: () => Promise<void>;
  handleDeleteTask: (id: string) => Promise<void>;
};

const TaskListItem = ({
  filteredTasks,
  handleToggleTask,
  handleGetTasks,
  handleDeleteTask,
}: TaskListItemProps) => {
  return (
    <div className="mt-4 border-b">
      {filteredTasks.map((task) => (
        <div
          key={task.id}
          className="h-14 flex justify-between items-center border-t"
        >
          <div
            className={`w-1 h-full ${
              task.isCompleted ? "bg-green-400" : "bg-red-400"
            }`}
          ></div>
          <p
            className={`flex-1 px-2 text-sm font-sans cursor-pointer hover:text-gray-500 ${
              task.isCompleted ? "line-through text-gray-400" : ""
            }`}
            onClick={() => handleToggleTask(task.id)}
          >
            {task.title}
          </p>

          <div className="flex items-center gap-2">
            <EditTask task={task} handleGetTasks={handleGetTasks} />
            <Trash
              size={16}
              className="cursor-pointer"
              onClick={() => handleDeleteTask(task.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskListItem;
