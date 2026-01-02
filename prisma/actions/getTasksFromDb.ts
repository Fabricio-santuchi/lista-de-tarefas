"use server";

import { prisma } from "@/lib/prisma";

export async function GetTasks() {
  try {
    const tasks = await prisma.tasks.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (!tasks) return;

    return tasks;
  } catch (error) {
    throw error;
  }
}
