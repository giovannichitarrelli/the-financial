import {
  InvestmentsObjectType,
  InvestmentsType,
  TransactionCategory,
  TransactionEssentialType,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";

export const TRANSACTION_PAYMENT_METHOD_ICONS = {
  [TransactionPaymentMethod.CREDIT_CARD]: "credit-card.svg",
  [TransactionPaymentMethod.DEBIT_CARD]: "debit-card.svg",
  [TransactionPaymentMethod.BANK_TRANSFER]: "bank-transfer.svg",
  [TransactionPaymentMethod.BANK_SLIP]: "bank-slip.svg",
  [TransactionPaymentMethod.CASH]: "money.svg",
  [TransactionPaymentMethod.PIX]: "pix.svg",
  [TransactionPaymentMethod.CRIPTO]: "money.svg",
  [TransactionPaymentMethod.OTHER]: "other.svg",
};

export const TRANSACTION_CATEGORY_LABELS = {
  HOUSING: "Moradia",
  TRANSPORTATION: "Transporte",
  FOOD: "Mercado",
  FAST_FOOD: "Lanches",
  ENTERTAINMENT: "Lazer",
  COMMUNICATIONS: "Comunicações",
  PERSONAL_CARE: "Cuidados Pessoais",
  SHOPPING: "Compras",
  SALARY: "Salário",
  EDUCATION: "Educação",
  SECURITIES: "Seguros",
  SUBSCRIPTIONS: "Assinaturas",
  PET: "Pets",
  PUBLIC_SERVICES: "Serviços públicos",
  HOME_RENOVATION: "Reformas domésticas",
  HEALTH: "Saúde",
  DONATIONS_AND_PRESENTS: "Doações e Presentes",

  OTHER: "Outros",
};

export const TRANSACTION_PAYMENT_METHOD_LABELS = {
  CREDIT_CARD: "Cartão de Crédito",
  DEBIT_CARD: "Cartão de Débito",
  BANK_TRANSFER: "Transferência Bancária",
  CRIPTO: "Criptomoeda",
  BANK_SLIP: "Boleto Bancário",
  CASH: "Dinheiro",
  PIX: "Pix",
  OTHER: "Outros",
};

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

export const TRANSACTION_ESSENTIAL_TYPE_OPTIONS = [
  {
    value: TransactionEssentialType.ESSENTIAL,
    label: "Essencial",
  },
  {
    value: TransactionEssentialType.NOT_ESSENTIAL,
    label: "Não essencial",
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

export const TRANSACTION_PAYMENT_METHOD_OPTIONS = [
  {
    value: TransactionPaymentMethod.CREDIT_CARD,
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.CREDIT_CARD],
  },
  {
    value: TransactionPaymentMethod.DEBIT_CARD,
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.DEBIT_CARD],
  },
  {
    value: TransactionPaymentMethod.BANK_TRANSFER,
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.BANK_TRANSFER],
  },
  {
    value: TransactionPaymentMethod.CRIPTO,
    label: TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.CRIPTO],
  },
  {
    value: TransactionPaymentMethod.BANK_SLIP,
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.BANK_SLIP],
  },
  {
    value: TransactionPaymentMethod.CASH,
    label: TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.CASH],
  },
  {
    value: TransactionPaymentMethod.PIX,
    label: TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.PIX],
  },
  {
    value: TransactionPaymentMethod.OTHER,
    label: TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.OTHER],
  },
];

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
  {
    value: TransactionCategory.HOME_RENOVATION,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.HOME_RENOVATION],
  },
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
  {
    value: TransactionCategory.SALARY,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.SALARY],
  },
  {
    value: TransactionCategory.OTHER,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.OTHER],
  },
];
