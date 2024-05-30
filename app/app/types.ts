import { ReturnTypeWithoutPromise } from "@/types/return-type-without-promise";
import { getUserSalary } from "./recebidos/actions";
import { getUserExpenses } from "./despesas/actions";
import { getUserInvestments, getUserWithdraws } from "./investimentos/actions";
import { getUserWishlist } from "./metas/actions";

export type Expenses = ReturnTypeWithoutPromise<typeof getUserExpenses>[0];
export type Salary = ReturnTypeWithoutPromise<typeof getUserSalary>[0];
export type Investments = ReturnTypeWithoutPromise<
  typeof getUserInvestments
>[0];
export type Wishlist = ReturnTypeWithoutPromise<typeof getUserWishlist>[0];
export type Withdraw = ReturnTypeWithoutPromise<typeof getUserWithdraws>[0];
