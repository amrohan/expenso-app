export type Response<T> = {
  status: number;
  message: string;
  Data: T;
};
