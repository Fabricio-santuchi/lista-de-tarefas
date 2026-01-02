"use server";

import { prisma } from "@/lib/prisma";

export const NewTask = async (task: string) => {
  try {
    if (!task) return;

    const newTask = await prisma.tasks.create({
      data: {
        title: task,
        isCompleted: false,
      },
    });

    if (!newTask) return;

    return newTask;
  } catch (error) {
    throw error;
  }
};
