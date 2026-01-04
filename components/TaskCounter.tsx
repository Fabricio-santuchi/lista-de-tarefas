import { Tasks } from "@/generated/prisma/client";
import { Sigma } from "lucide-react";

type TaskCounterProps = {
  taskList: Tasks[];
};

const TaskCounter = ({ taskList }: TaskCounterProps) => {
  return (
    <div className="flex justify-end items-center mt-4 gap-2">
      <Sigma size={18} />
      <p className="text-xs">{taskList.length} Tarefas no total</p>
    </div>
  );
};

export default TaskCounter;
