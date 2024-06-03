"use server";

import { DeleteWishlistSchema, upsertWishlistSchema } from "./schema";
import { z } from "zod";
import { db } from "@/services/database";
import { getServerSession } from "next-auth";
import { auth } from "@/services/auth";
export async function getUserWishlist() {
  const session = await getServerSession(auth);
  const wishlist = await db.wishlist.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      createAt: "desc",
    },
  });
  return wishlist;
}

export async function upsertWishlist(
  input: z.infer<typeof upsertWishlistSchema>,
) {
  const session = await getServerSession(auth);
  if (!session?.user?.id) {
    return {
      error: "Não autorizado",
      data: null,
    };
  }

  if (input.id) {
    const wishlist = await db.wishlist.findUnique({
      where: {
        id: input.id,
        userId: session?.user?.id,
      },
      select: {
        id: true,
      },
    });

    if (!wishlist) {
      return {
        error: " Não encontrado",
        data: null,
      };
    }

    const updateWishlist = await db.wishlist.update({
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
      data: updateWishlist,
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

  const wishlist = await db.wishlist.create({
    data: {
      title: input.title,
      price: input.ammount,
      userId: session?.user?.id,
    },
  });
  return wishlist;
}

export async function deleteWishlist(
  input: z.infer<typeof DeleteWishlistSchema>,
) {
  const session = await getServerSession(auth);

  if (!session?.user?.id) {
    return {
      error: "Não autorizado",
      data: null,
    };
  }

  const wishlist = await db.wishlist.findUnique({
    where: {
      id: input.id,
      userId: session?.user?.id,
    },
    select: {
      id: true,
    },
  });

  if (!wishlist) {
    return {
      error: "Não encontrado",
      data: null,
    };
  }
  await db.wishlist.delete({
    where: {
      id: input.id,
      userId: session?.user?.id,
    },
  });
  return {
    error: "Lista de desejos não foi deletada",
    data: null,
  };
}
