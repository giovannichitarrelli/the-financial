"use server";

import { DeleteSalarySchema, upsertSalarySchema } from "./schema";
import { z } from "zod";
import { db } from "@/services/database";
import { getServerSession } from "next-auth";
import { auth } from "@/services/auth";

export async function getUserSalary() {
  const session = await getServerSession(auth);
  const salary = await db.salary.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      expiryAt: "desc",
    },
  });
  return salary;
}

export async function getUserMonthSalary(month: number, year: number) {
  const session = await getServerSession(auth);
  const monthSalary = await db.salary.findMany({
    where: {
      userId: session?.user?.id,
      expiryAt: {
        gte: new Date(year, month - 1, 1),
        lt: new Date(year, month, 0),
      },
    },
    orderBy: {
      expiryAt: "desc",
    },
  });
  return monthSalary;
}

export async function upsertSalary(input: z.infer<typeof upsertSalarySchema>) {
  const session = await getServerSession(auth);
  if (!session?.user?.id) {
    return {
      error: "Não autorizado",
      data: null,
    };
  }
  if (input.id) {
    const salary = await db.salary.findUnique({
      where: {
        id: input.id,
        userId: session?.user?.id,
      },
      select: {
        id: true,
      },
    });

    if (!salary) {
      return {
        error: " Não encontrado",
        data: null,
      };
    }

    const updateSalary = await db.salary.update({
      where: {
        id: input.id,
        userId: session?.user?.id,
      },
      data: {
        title: input.title,
        price: input.price,
        expiryAt: input.expiryAt,
        isFixed: input.isFixed,
        doneAt: input.doneAt,
        userId: session?.user?.id,
      },
    });
    return {
      error: null,
      data: updateSalary,
    };
  }
  if (!input.title) {
    return {
      error: "Título é obrigatório",
      data: null,
    };
  }
  if (!input.price) {
    return {
      error: "Valor é obrigatório",
      data: null,
    };
  }

  await db.salary.create({
    data: {
      title: input.title,
      price: input.price,
      isFixed: input.isFixed,
      userId: session?.user?.id,
      expiryAt: input.expiryAt,
    },
  });
}

export async function deleteSalary(input: z.infer<typeof DeleteSalarySchema>) {
  const session = await getServerSession(auth);

  if (!session?.user?.id) {
    return {
      error: "Não autorizado",
      data: null,
    };
  }

  const salary = await db.salary.findUnique({
    where: {
      id: input.id,
      userId: session?.user?.id,
    },
    select: {
      id: true,
    },
  });

  if (!salary) {
    return {
      error: "Not found",
      data: null,
    };
  }
  await db.salary.delete({
    where: {
      id: input.id,
      userId: session?.user?.id,
    },
  });
  return {
    error: "Salario não foi deletada",
    data: null,
  };
}
