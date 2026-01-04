"use server";

import { prisma } from "@/lib/prisma";

export const updateTaskStatus = async (taskId: string) => {
  try {
    const currentTask = await prisma.tasks.findUnique({
      where: { id: taskId },
    });

    if (!currentTask) return;

    const updatedTask = await prisma.tasks.update({
      where: { id: taskId },
      data: { isCompleted: !currentTask.isCompleted },
    });

    if (!updatedTask) return;

    return updatedTask;
  } catch (error) {
    throw error;
  }
};
