export class Entry {
  id: string;
  text: string;
  starred: boolean;
  createdAt: Date;
  completed?: boolean;
  date?: Date;
  amount?: number;
  hyperlink?: string;
  listId: string;
}
