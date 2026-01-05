import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import { Button } from "./button";

type DeltasksProps = {
  clearCompletedTasks: () => Promise<void>;
  completedCount: number;
};

const DelTask = ({ clearCompletedTasks, completedCount }: DeltasksProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="text-xs h-7 cursor-pointer">
          <Trash /> Limpar tarefas concluidas
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja excluir {completedCount} itens?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            className="cursor-pointer"
            onClick={clearCompletedTasks}
          >
            Sim
          </AlertDialogAction>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DelTask;
