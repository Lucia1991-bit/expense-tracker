export interface Transaction {
  id: string;
  userId: string;
  item: string;
  amount: number;
  type: "expense" | "income";
  createdAt: Date;
}
