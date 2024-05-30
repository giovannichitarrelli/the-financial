"use server";

import { auth } from "@/app/_lib/auth";
import {
  DeleteInvestmentsSchema,
  DeleteWithdrawsSchema,
  upsertInvestmentsSchema,
  upsertWithdrawsSchema,
} from "./schema";
import { z } from "zod";
import { db } from "@/app/_lib/prisma";

// investments
export async function getUserInvestments() {
  const session = await auth();
  const investments = await db.investments.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      createAt: "desc",
    },
  });
  return investments;
}
export async function getUserMonthInvestments(month: number, year: number) {
  const session = await auth();
  const monthInvestments = await db.investments.findMany({
    where: {
      userId: session?.user?.id,
      createAt: {
        gte: new Date(year, month - 1, 1),
        lt: new Date(year, month, 0),
      },
    },
  });
  return monthInvestments;
}
export async function upsertInvestments(
  input: z.infer<typeof upsertInvestmentsSchema>,
) {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      error: "Não autorizado",
      data: null,
    };
  }

  if (input.id) {
    const investments = await db.investments.findUnique({
      where: {
        id: input.id,
        userId: session?.user?.id,
      },
      select: {
        id: true,
      },
    });

    if (!investments) {
      return {
        error: " Não encontrado",
        data: null,
      };
    }

    const updateInvestments = await db.investments.update({
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
      data: updateInvestments,
    };
  }

  if (!input.title) {
    return {
      error: "Título é obrigatório",
      data: null,
    };
  }
  if (!input.ammount) {
    return {
      error: "Valor é obrigatório",
      data: null,
    };
  }

  const investments = await db.investments.create({
    data: {
      title: input.title,
      price: input.ammount,
      userId: session?.user?.id,
      doneAt: new Date(),
    },
  });
  return investments;
}
export async function deleteInvestments(
  input: z.infer<typeof DeleteInvestmentsSchema>,
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "Não autorizado",
      data: null,
    };
  }

  const investments = await db.investments.findUnique({
    where: {
      id: input.id,
      userId: session?.user?.id,
    },
    select: {
      id: true,
    },
  });

  if (!investments) {
    return {
      error: "Não encontrado",
      data: null,
    };
  }
  await db.investments.delete({
    where: {
      id: input.id,
      userId: session?.user?.id,
    },
  });
  return {
    error: "Investimento não foi deletado",
    data: null,
  };
}

// withdraw
export async function getUserWithdraws() {
  const session = await auth();
  const withdraws = await db.withdraw.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      createAt: "desc",
    },
  });
  return withdraws;
}
export async function upsertWithdraws(
  input: z.infer<typeof upsertWithdrawsSchema>,
) {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      error: "Não autorizado",
      data: null,
    };
  }

  if (input.id) {
    const updateWithdwaws = await db.withdraw.findUnique({
      where: {
        id: input.id,
        userId: session?.user?.id,
      },
      select: {
        id: true,
      },
    });

    if (!updateWithdwaws) {
      return {
        error: " Não encontrado",
        data: null,
      };
    }

    const updateWithdraws = await Prisma.withdraw.update({
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
      data: updateWithdraws,
    };
  }

  if (!input.title) {
    return {
      error: "Título é obrigatório",
      data: null,
    };
  }
  if (!input.amount) {
    return {
      error: "Valor é obrigatório",
      data: null,
    };
  }

  const withdraws = await db.withdraw.create({
    data: {
      title: input.title,
      price: input.amount,
      userId: session?.user?.id,
      doneAt: new Date(),
    },
  });
  return withdraws;
}
export async function getUserMonthWithdraws(month: number, year: number) {
  const session = await auth();
  const monthWithdraws = await db.withdraw.findMany({
    where: {
      userId: session?.user?.id,
      createAt: {
        gte: new Date(year, month - 1, 1),
        lt: new Date(year, month, 0),
      },
    },
  });
  return monthWithdraws;
}
export async function deleteWithdraws(
  input: z.infer<typeof DeleteWithdrawsSchema>,
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "Não autorizado",
      data: null,
    };
  }

  const withdraws = await Prisma.withdraw.findUnique({
    where: {
      id: input.id,
      userId: session?.user?.id,
    },
    select: {
      id: true,
    },
  });

  if (!withdraws) {
    return {
      error: "Não encontrado",
      data: null,
    };
  }
  await db.withdraw.delete({
    where: {
      id: input.id,
      userId: session?.user?.id,
    },
  });
  return {
    error: "Saque não foi deletado",
    data: null,
  };
}
