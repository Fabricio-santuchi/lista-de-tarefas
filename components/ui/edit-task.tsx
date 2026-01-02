import { SquarePen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Button } from "./button";
import { Input } from "./input";

const EditTask = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <SquarePen size={15} className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar tarefa</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2 md:flex-row">
          <Input type="text" placeholder="Editar tarefa" />
          <Button className="cursor-pointer">Editar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTask;
