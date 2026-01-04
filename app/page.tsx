"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";
import { BadgePlus, LoaderCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Tasks } from "@/generated/prisma/client";
import { GetTasks } from "@/prisma/actions/getTasksFromDb";
import { NewTask } from "@/prisma/actions/add-task";
import { DeleteTask } from "@/prisma/actions/delete-task";
import { toast } from "sonner";
import { updateTaskStatus } from "@/prisma/actions/toggle-down";
import Filter, { FilterType } from "@/components/filter";
import { DeleteCompletedTasks } from "@/prisma/actions/clear-completed-task";
import TasksEmpty from "@/components/TasksEmpty";
import TaskListItem from "@/components/TaskListItem";
import TaskCounter from "@/components/TaskCounter";
import TaskProgress from "@/components/TaskProgress";
import TaskProgressBar from "@/components/TaskProgressBar";

const Home = () => {
  const [taskList, setTaskList] = useState<Tasks[]>([]);
  const [task, setTask] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<FilterType>("all");

  const handleGetTasks = async () => {
    try {
      const tasks = await GetTasks();
      if (!tasks) return;
      setTaskList(tasks);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      await handleGetTasks();
    };

    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!task.trim()) {
      toast.error("Por favor, insira uma tarefa válida.");
      return;
    }

    setLoading(true);
    try {
      const newTask = await NewTask(task);
      if (!newTask) return;

      setTask("");
      toast.success("Tarefa adicionada com sucesso!");
      await handleGetTasks();
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await DeleteTask(id);
      await handleGetTasks();
      toast.warning("Tarefa deletada com sucesso!");
    } catch (error) {
      throw error;
    }
  };

  const handleToggleTask = async (taskId: string) => {
    const previousTasks = [...taskList];

    setTaskList((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );

    try {
      await updateTaskStatus(taskId);
    } catch (error) {
      setTaskList(previousTasks);
      throw error;
    }
  };

  const clearCompletedTasks = async () => {
    try {
      const deleteTasks = await DeleteCompletedTasks();

      if (!deleteTasks) return;

      setTaskList(deleteTasks);
    } catch (error) {
      throw error;
    }
  };

  // FILTRO
  const filteredTasks = useMemo(() => {
    if (currentFilter === "pending") {
      return taskList.filter((task) => !task.isCompleted);
    }

    if (currentFilter === "completed") {
      return taskList.filter((task) => task.isCompleted);
    }

    return taskList;
  }, [currentFilter, taskList]);

  // CONTADORES
  const completedCount = useMemo(
    () => taskList.filter((task) => task.isCompleted).length,
    [taskList]
  );

  return (
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-lg">
        <CardHeader className="flex gap-2">
          <Input
            type="text"
            placeholder="Adicionar tarefa"
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />
          <Button
            variant="default"
            className="cursor-pointer"
            onClick={handleAddTask}
          >
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <BadgePlus />
            )}
            Cadastrar
          </Button>
        </CardHeader>

        <CardContent>
          <Separator className="mb-4" />

          <Filter
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
          />

          <TasksEmpty
            currentFilter={currentFilter}
            taskList={taskList}
            filteredTasks={filteredTasks}
          />

          <TaskListItem
            filteredTasks={filteredTasks}
            handleToggleTask={handleToggleTask}
            handleGetTasks={handleGetTasks}
            handleDeleteTask={handleDeleteTask}
          />

          <TaskProgress
            completedCount={completedCount}
            taskList={taskList}
            clearCompletedTasks={clearCompletedTasks}
          />

          <TaskProgressBar
            taskList={taskList}
            completedCount={completedCount}
          />

          <TaskCounter taskList={taskList} />
        </CardContent>
      </Card>
    </main>
  );
};

export default Home;
