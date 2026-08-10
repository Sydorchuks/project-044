export type Account = {
  id: number;
  email: string;
  status: string;
  role?: {
    id: number;
    name: string;
  };
  user?: {
    id: number;
  };
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
  account: Account;
};
