export type User = {
  id: string;
  username: string;
  name: string;
  email: string;
  password?: string;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  isDeleted?: boolean;
  isActive?: boolean;
  isVerified?: boolean;
};

export type cloudinary = {
  secure_url: string;
};
