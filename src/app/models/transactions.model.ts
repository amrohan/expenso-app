export type Transaction = {
  id: string;
  title: string;
  amount: number;
  date: Date;
  type: string;
  imageUrl?: string;
  categoryId: string;
  accountId: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  isDeleted?: boolean;
  isActive?: boolean;
};

export type TransactionByUsers = {
  summary: Summary;
  transaction: Transaction[];
};

export type Summary = {
  totalExpense: number;
  totalIncome: number;
};
