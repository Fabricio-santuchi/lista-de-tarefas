"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";
import {
  BadgePlus,
  ListChecks,
  Sigma,
  Trash,
  LoaderCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Tasks } from "@/generated/prisma/client";
import { GetTasks } from "@/prisma/actions/getTasksFromDb";
import { NewTask } from "@/prisma/actions/add-task";
import { DeleteTask } from "@/prisma/actions/delete-task";
import { toast } from "sonner";
import { updateTaskStatus } from "@/prisma/actions/toggle-down";
import DelTask from "@/components/ui/del-task";
import EditTask from "@/components/edit-task";
import Filter, { FilterType } from "@/components/filter";
import { DeleteCompletedTasks } from "@/prisma/actions/clear-completed-task";

const Home = () => {
  const [taskList, setTaskList] = useState<Tasks[]>([]);
  const [task, setTask] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<FilterType>("all");
  const [filteredTasks, setFilteredTasks] = useState<Tasks[]>([]);

  const handleGetTasks = async () => {
    try {
      const tasks = await GetTasks();
      if (!tasks) return;
      setTaskList(tasks);
    } catch (error) {
      throw error;
    }
  };

  const handleAddTask = async () => {
    setLoading(true);
    try {
      if (task.length === 0 || !task) {
        toast.error("Por favor, insira uma tarefa válida.");
        setLoading(false);
        return;
      }

      const myNewTask = await NewTask(task);
      if (!myNewTask) return;

      setTask("");
      toast.success("Tarefa adicionada com sucesso!");
      await handleGetTasks();
    } catch (error) {
      throw error;
    }
    setLoading(false);
  };

  const handleDeleteTask = async (id: string) => {
    try {
      if (!id) return;

      const deletedTask = await DeleteTask(id);

      if (!deletedTask) return;

      await handleGetTasks();
      toast.warning("Tarefa deletada com sucesso!");
    } catch (error) {
      throw error;
    }
  };

  const handleToggleTask = async (taskId: string) => {
    const previousTasks = [...taskList];

    try {
      setTaskList((prev) => {
        const updatedTaksList = prev.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              isCompleted: !task.isCompleted,
            };
          } else {
            return task;
          }
        });
        return updatedTaksList;
      });

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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleGetTasks();
  }, []);

  useEffect(() => {
    switch (currentFilter) {
      case "all":
        setFilteredTasks(taskList);
        break;

      case "pending":
        const pedingTasks = taskList.filter((task) => !task.isCompleted);
        setFilteredTasks(pedingTasks);
        break;

      case "completed":
        const completedTasks = taskList.filter((task) => task.isCompleted);
        setFilteredTasks(completedTasks);
        break;

      default:
        setFilteredTasks(taskList);
        break;
    }
  }, [currentFilter, taskList]);

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

          {taskList.length === 0 && (
            <div className="text-xs mt-4 pt-4 pb-1 border-t text-center text-gray-500">
              Nenhuma tarefa cadastrada
            </div>
          )}

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

          {/* barra de tarefas concluidas */}
          <div className="flex justify-between mt-4">
            <div className="flex gap-2 items-center">
              <ListChecks size={18} />
              <p className="text-xs">
                Tarefas concluidas (
                {taskList.filter((task) => task.isCompleted).length}/
                {taskList.length})
              </p>
            </div>

            <DelTask clearCompletedTasks={clearCompletedTasks} />
          </div>

          {/* barra de progresso de tarefas */}

          <div className="h-2 w-full bg-gray-100 mt-4 rounded-md transition">
            <div
              className="h-full bg-green-400 rounded-md transition"
              style={{
                width: `${
                  (taskList.filter((task) => task.isCompleted).length /
                    taskList.length) *
                  100
                }%`,
              }}
            ></div>
          </div>

          <div className="flex justify-end items-center mt-2 gap-2">
            <Sigma size={18} />
            <p className="text-xs">{taskList.length} Tarefas no total</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Home;
