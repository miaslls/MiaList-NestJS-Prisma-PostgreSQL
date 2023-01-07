export type MappedEntry = {
  id: string;
  text: string;
  createdAt: Date;
  starred?: boolean;
  completed?: boolean;
  date?: Date;
  amount?: number;
  hyperlink?: string;
};

export type MappedTag = {
  id: string;
  name: string;
};

export type MappedList = {
  id: string;
  title: string;
  icon: string;
  pinned: boolean;
  isChecklist: boolean;
  createdAt: Date;
  category: {
    id: string;
    name: string;
  };
  tags: MappedTag[];
  entries: MappedEntry[];
};
