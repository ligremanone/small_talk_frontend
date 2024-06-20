export interface Profile {
  id: number;
  username: string;
  avatar_url: string | null;
  subscribers_amount: number;
  firstname: string;
  lastname: string;
  isActive: boolean;
  stack: string[];
  city: string;
  description: string;
}
