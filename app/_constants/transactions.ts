import {
  InvestmentsObjectType,
  InvestmentsType,
  TransactionCategory,
  TransactionDepositCategory,
  TransactionType,
} from "@prisma/client";

export const TRANSACTION_CATEGORY_LABELS = {
  HOUSING: "Moradia",
  TRANSPORTATION: "Transporte",
  FOOD: "Mercado",
  FAST_FOOD: "Lanches",
  ENTERTAINMENT: "Lazer",
  COMMUNICATIONS: "Comunicações",
  PERSONAL_CARE: "Cuidados Pessoais",
  SHOPPING: "Compras",
  // SALARY: "Salário",
  EDUCATION: "Educação",
  SECURITIES: "Seguros",
  SUBSCRIPTIONS: "Assinaturas",
  PET: "Pets",
  PUBLIC_SERVICES: "Serviços públicos",
  // HOME_RENOVATION: "Reformas domésticas",
  HEALTH: "Saúde",
  DONATIONS_AND_PRESENTS: "Doações e Presentes",
  OTHER: "Outros",
};
export const TRANSACTION_CATEGORY_OPTIONS = [
  {
    value: TransactionCategory.HOUSING,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.HOUSING],
  },
  {
    value: TransactionCategory.TRANSPORTATION,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.TRANSPORTATION],
  },
  {
    value: TransactionCategory.FOOD,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.FOOD],
  },
  {
    value: TransactionCategory.FAST_FOOD,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.FAST_FOOD],
  },
  {
    value: TransactionCategory.ENTERTAINMENT,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.ENTERTAINMENT],
  },
  // {
  //   value: TransactionCategory.HOME_RENOVATION,
  //   label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.HOME_RENOVATION],
  // },
  {
    value: TransactionCategory.COMMUNICATIONS,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.COMMUNICATIONS],
  },
  {
    value: TransactionCategory.PERSONAL_CARE,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.PERSONAL_CARE],
  },
  {
    value: TransactionCategory.SHOPPING,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.SHOPPING],
  },

  {
    value: TransactionCategory.EDUCATION,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.EDUCATION],
  },
  {
    value: TransactionCategory.PUBLIC_SERVICES,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.PUBLIC_SERVICES],
  },
  {
    value: TransactionCategory.SECURITIES,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.SECURITIES],
  },
  {
    value: TransactionCategory.SUBSCRIPTIONS,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.SUBSCRIPTIONS],
  },
  {
    value: TransactionCategory.PET,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.PET],
  },

  {
    value: TransactionCategory.HEALTH,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.HEALTH],
  },
  {
    value: TransactionCategory.DONATIONS_AND_PRESENTS,
    label:
      TRANSACTION_CATEGORY_LABELS[TransactionCategory.DONATIONS_AND_PRESENTS],
  },
  // {
  //   value: TransactionCategory.SALARY,
  //   label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.SALARY],
  // },
  {
    value: TransactionCategory.OTHER,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.OTHER],
  },
];

export const TRANSACTION_DEPOSIT_CATEGORY_LABELS = {
  SALARY: "Salário",
  EXTRA: "Extra",
};
export const TRANSACTION_DEPOSIT_CATEGORY_OPTIONS = [
  {
    value: TransactionDepositCategory.SALARY,
    label:
      TRANSACTION_DEPOSIT_CATEGORY_LABELS[TransactionDepositCategory.SALARY],
  },
  {
    value: TransactionDepositCategory.EXTRA,
    label:
      TRANSACTION_DEPOSIT_CATEGORY_LABELS[TransactionDepositCategory.EXTRA],
  },
];

export const TRANSACTION_TYPE_OPTIONS = [
  {
    value: TransactionType.EXPENSE,
    label: "Despesa",
  },
  {
    value: TransactionType.DEPOSIT,
    label: "Depósito",
  },
];

export const INVESTMENT_TYPE_OPTIONS = [
  {
    value: InvestmentsType.DEPOSIT,
    label: "Depósito",
  },
  {
    value: InvestmentsType.WITHDRAW,
    label: "Retirada",
  },
];

export const INVESTMENT_OBJECT_TYPE_OPTIONS = [
  {
    value: InvestmentsObjectType.EMERGENCY_RESERVE,
    label: "Reserva de emergência",
  },
  {
    value: InvestmentsObjectType.RETIREMENT,
    label: "Aposentadoria",
  },
  {
    value: InvestmentsObjectType.GOALS,
    label: "Metas",
  },
  {
    value: InvestmentsObjectType.OTHER,
    label: "Outros",
  },
];
