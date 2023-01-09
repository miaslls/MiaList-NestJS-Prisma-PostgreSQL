export type FormattedEntry = {
  id: string;
  text: string;
  createdAt: Date;
  starred?: boolean;
  completed?: boolean;
  date?: Date;
  amount?: number;
  hyperlink?: string;
};

export type FormattedTag = {
  id: string;
  name: string;
};

export type FormattedList = {
  id: string;
  title: string;
  icon: string;
  pinned: boolean;
  isChecklist: boolean;
  createdAt: Date;
  category: { id: string; name: string };
  tags: FormattedTag[];
  entries: FormattedEntry[];
};
