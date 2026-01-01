import Tarefas from "@/components/Tarefas/Tarefas";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  BadgePlus,
  Check,
  CircleEllipsis,
  List,
  ListChecks,
  Sigma,
  Trash,
} from "lucide-react";

const Home = () => {
  return (
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-lg">
        <CardHeader className="flex gap-2">
          <Input type="email" placeholder="Adicionar tarefa" />
          <Button variant="default" className="cursor-pointer">
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
            <Tarefas />
          </div>

          {/* barra de tarefas concluidas */}
          <div className="flex justify-between mt-4">
            <div className="flex gap-2 items-center">
              <ListChecks size={18} />
              <p className="text-xs">Tarefas concluidas (3/3)</p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="text-xs h-7 cursor-pointer"
                >
                  <Trash /> Limpar tarefas concluidas
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Tem certeza que deseja excluir x itens?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>Sim</AlertDialogAction>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
