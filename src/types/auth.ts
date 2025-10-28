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
  name: string;
  email: string;
  password: string;
};
