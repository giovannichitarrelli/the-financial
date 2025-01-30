/* eslint-disable no-unused-vars */

import {
  TransactionCategory,
  TransactionEssentialType,
  TransactionType,
} from "@prisma/client";

export type TransactionPercentagePerType = {
  [key in TransactionType]: number;
};

export interface TotalExpensePerCategory {
  category: TransactionCategory;
  totalAmount: number;
  percentageOfTotal: number;
}

export type TransactionEssentialPercentagePerType = {
  [key in Exclude<TransactionEssentialType, "SALARY">]: number;
};
