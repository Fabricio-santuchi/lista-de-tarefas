import { SquarePen } from "lucide-react";
import { Tasks } from "@/generated/prisma/client";
import { useState } from "react";
import { toast } from "sonner";
import { editTask } from "@/prisma/actions/edit-task";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";

type TaskProps = {
  task: Tasks;
  handleGetTasks: () => Promise<void>;
};

const EditTask = ({ task, handleGetTasks }: TaskProps) => {
  const [editedTask, setEditedTask] = useState(task.title);

  const handleEditTask = async () => {
    try {
      if (editedTask !== task.title) {
        toast.success("Tarefa editada com sucesso!");
      } else {
        toast.error("As informações não foram alteradas!");
        return;
      }

      await editTask({ idTask: task.id, newTask: editedTask });

      handleGetTasks();
    } catch (error) {
      throw error;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SquarePen size={15} className="cursor-pointer" />
      </DialogTrigger>
      <DialogDescription aria-describedby={undefined} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar tarefa</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2 md:flex-row">
          <Input
            type="text"
            placeholder="Editar tarefa"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
          <DialogClose asChild>
            <Button className="cursor-pointer" onClick={handleEditTask}>
              Editar
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTask;
