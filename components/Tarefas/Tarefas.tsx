import { SquarePen, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Tarefas = () => {
  return (
    <div className="h-14 flex justify-between items-center border-t">
      <div className="w-1 h-full bg-green-300"></div>
      <p className="flex-1 px-2 text-sm">Estudar React</p>

      <div className="flex items-center gap-2">
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
        <Trash size={16} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Tarefas;
