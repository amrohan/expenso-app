export type Category = {
  id: string;
  title: string;
  imageUrl: string;
  userId: string;
  isDefault?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  isDeleted?: boolean;
  isActive?: boolean;
};
