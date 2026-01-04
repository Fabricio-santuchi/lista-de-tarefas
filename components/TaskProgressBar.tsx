import { Tasks } from "@/generated/prisma/client";
import { useMemo } from "react";

type TaskProgressBarProps = {
  taskList: Tasks[];
  completedCount: number;
};

const TaskProgressBar = ({
  taskList,
  completedCount,
}: TaskProgressBarProps) => {
  //refactor: compute task progress as derived state
  const progressPercent = useMemo(() => {
    if (taskList.length === 0) return 0;
    return (completedCount / taskList.length) * 100;
  }, [completedCount, taskList.length]);

  return (
    <div className="h-2 w-full bg-gray-100 mt-4 rounded-md transition">
      <div
        className="h-full bg-green-400 rounded-md transition"
        style={{ width: `${progressPercent}%` }}
      ></div>
    </div>
  );
};

export default TaskProgressBar;
