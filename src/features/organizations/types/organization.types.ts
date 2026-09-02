export type Organization = {
  id: number;
  name: string;
  description?: string | null;
  photo?: string | null;
  phone: string;
  address: string;
  is_deleted: boolean;
};
