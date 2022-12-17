export class List {
  id: string;
  title: string;
  icon: string;
  pinned: boolean;
  isChecklist: boolean;
  createdAt: Date;
  categoryId?: string;
  tagIds: string[];
  userId: string;
}
