"use server";

import { prisma } from "@/lib/prisma";

type EditTaskProps = {
  idTask: string;
  newTask: string;
};

export const editTask = async ({ idTask, newTask }: EditTaskProps) => {
  try {
    if (!idTask || !newTask) return;

    const editedTask = await prisma.tasks.update({
      where: { id: idTask },
      data: { title: newTask },
    });

    if (!editedTask) return;

    return editedTask;
    
  } catch (error) {
    throw error;
  }
};
