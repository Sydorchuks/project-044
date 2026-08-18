export enum UserStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
  DELETED = "DELETED",
  PENDING = "PENDING",
}

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  domain_url?: string | null;
  image?: string | null;
  description?: string | null;
  created_at: string;
  updated_at: string;
  account: {
    id: number;
    email: string;
    status: UserStatus;
    role?: {
      id: number;
      name: string;
    };
  };
};

export type UsersResponse = {
  filters: {
    skip?: number;
    limit?: number;
    search?: string;
    sorted?: string;
    total: number;
    received: number;
  };
  data: User[];
};

export type GetUsersParams = {
  skip?: number;
  limit?: number;
  search?: string;
  sort?: string;
};

export type CreateUserPayload = {
  email: string;
  roleId: number;
  user: {
    first_name: string;
    last_name: string;
    phone: string;
    domain_url: string;
    description?: string;
  };
};

export type CreateUserResponse = {
  reset_token?: string;
};
