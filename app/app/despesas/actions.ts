"use server";
import { auth } from "@/services/auth";
import { DeleteExpensesSchema, upsertExpensesSchema } from "./schema";
import { z } from "zod";
import { db } from "@/services/database";

export async function getCategories() {
  const categories = await db.categories.findMany({});
  return categories;
}
export async function getUserExpenses() {
  const session = await auth();
  const expenses = await db.expenses.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      createAt: "desc",
    },
  });
  return expenses;
}

export async function getUserMonthExpenses(month: number, year: number) {
  const session = await auth();
  const monthExpenses = await db.expenses.findMany({
    where: {
      userId: session?.user?.id,
      expiryAt: {
        gte: new Date(year, month - 1, 1),
        lt: new Date(year, month, 0),
      },
    },
    orderBy: {
      createAt: "desc",
    },
  });
  return monthExpenses;
}

export async function getUserYearExpenses(year: number) {
  const session = await auth();
  const yearExpenses = await db.expenses.findMany({
    where: {
      userId: session?.user?.id,
      expiryAt: {
        gte: new Date(year, 0, 1),
        lt: new Date(year + 1, 0, 1),
      },
    },
  });
  return yearExpenses;
}

export async function upsertExpenses(
  input: z.infer<typeof upsertExpensesSchema>,
) {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      error: "Não autorizado",
      data: null,
    };
  }
  if (input.id) {
    const expenses = await db.expenses.findUnique({
      where: {
        id: input.id,
        userId: session?.user?.id,
      },
      select: {
        id: true,
      },
    });

    if (!expenses) {
      return {
        error: " Não encontrado",
        data: null,
      };
    }

    const updateExpenses = await db.expenses.update({
      where: {
        id: input.id,
        userId: session?.user?.id,
      },
      data: {
        title: input.title,
        doneAt: input.doneAt,
      },
    });
    return {
      error: null,
      data: updateExpenses,
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
      error: "Valore é obrigatório",
      data: null,
    };
  }

  await db.expenses.create({
    data: {
      title: input.title,
      price: input.price,
      expiryAt: input.expiryAt,
      categoriesId: input.categoriesId,
      isFixed: input.isFixed,
      userId: session?.user?.id,
    },
  });
}

export async function deleteExpenses(
  input: z.infer<typeof DeleteExpensesSchema>,
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "Não autorizado",
      data: null,
    };
  }

  const expenses = await db.expenses.findUnique({
    where: {
      id: input.id,
      userId: session?.user?.id,
    },
    select: {
      id: true,
    },
  });

  if (!expenses) {
    return {
      error: "Não encontrado",
      data: null,
    };
  }
  await db.expenses.delete({
    where: {
      id: input.id,
      userId: session?.user?.id,
    },
  });
  return {
    error: "Depesa deletada não foi deletada",
    data: null,
  };
}
