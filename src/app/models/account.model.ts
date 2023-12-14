export type Account = {
  id: string;
  title: string;
  imageUrl: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  isDeleted?: boolean;
  isActive?: boolean;
};
