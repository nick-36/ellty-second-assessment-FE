export interface Operation {
  id: number;
  type: string;
  rightNumber: number;
  result: number;
  userId: number;
  user: {
    username: string;
  };
  createdAt: string;
  children: Operation[];
}

export interface Tree {
  id: number;
  startingNumber: number;
  userId: number;
  user: {
    username: string;
  };
  operations: Operation[];
}
