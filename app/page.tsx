"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import DelTask from "@/components/ui/del-task";
import EditTask from "@/components/ui/edit-task";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";
import {
  BadgePlus,
  Check,
  CircleEllipsis,
  List,
  ListChecks,
  Sigma,
  Trash,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Tasks } from "@/generated/prisma/client";
import { GetTasks } from "@/prisma/actions/getTasksFromDb";
import { NewTask } from "@/prisma/actions/add-task";
import { DeleteTask } from "@/prisma/actions/delete-task";

const Home = () => {
  const [taskList, setTaskList] = useState<Tasks[]>([]);
  const [task, setTask] = useState<string>("");

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
    try {
      if (task.length === 0 || !task) return;

      const myNewTask = await NewTask(task);
      if (!myNewTask) return;

      setTask("");
      await handleGetTasks();
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      if (!id) return;

      const deletedTask = await DeleteTask(id);

      if (!deletedTask) return;

      await handleGetTasks();
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleGetTasks();
  }, []);

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
            <BadgePlus /> Cadastrar
          </Button>
        </CardHeader>

        <CardContent>
          <Separator className="mb-4" />

          <div className="flex gap-2">
            <Badge variant="default" className="cursor-pointer">
              <List /> Todos
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              <CircleEllipsis /> Não finalizados
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              <Check />
              Concluidos
            </Badge>
          </div>

          {/* <div className="mt-4 text-center text-gray-500">
            Nenhuma tarefa cadastrada
          </div> */}

          {/* tarefas cadastradas */}

          <div className="mt-4 border-b">
            {taskList.map((task) => (
              <div
                key={task.id}
                className="h-14 flex justify-between items-center border-t"
              >
                <div className="w-1 h-full bg-green-300"></div>
                <p className="flex-1 px-2 text-sm">{task.title}</p>

                <div className="flex items-center gap-2">
                  <EditTask />
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
              <p className="text-xs">Tarefas concluidas (3/3)</p>
            </div>
            <DelTask />
          </div>

          {/* barra de progresso de tarefas */}
          <div className="h-2 w-full bg-gray-100 mt-4 rounded-md">
            <div
              className="h-full bg-green-400 rounded-md"
              style={{ width: "50%" }}
            ></div>
          </div>

          <div className="flex justify-end items-center mt-2 gap-2">
            <Sigma size={18} />
            <p className="text-xs">3 Tarefas no total</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Home;
