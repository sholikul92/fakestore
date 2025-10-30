export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type ReturnAuthValue = {
  success: boolean;
  message: string;
};

export type User = {
  userId: number;
  name: string;
  email: string;
  password: string;
};
