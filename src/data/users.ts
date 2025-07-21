export type User = {
  id: string;
  email: string;
  role: "Actor" | "Producer";
};

export const users: User[] = [
  {
    id: "1",
    email: "actor@example.com",
    role: "Actor",
  },
  {
    id: "2",
    email: "producer@example.com",
    role: "Producer",
  },
]; 