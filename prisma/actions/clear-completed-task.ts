"use server";

import { prisma } from "@/lib/prisma";

export const DeleteCompletedTasks = async () => {
  try {
    await prisma.tasks.deleteMany({
      where: {
        isCompleted: true,
      },
    });

    const allTasks = await prisma.tasks.findMany();

    if (!allTasks) return;
    
    return allTasks;
  } catch (error) {
    throw error;
  }
};
