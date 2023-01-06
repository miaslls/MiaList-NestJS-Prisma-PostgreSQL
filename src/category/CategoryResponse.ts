import { CategoryDbResponse } from './CategoryDbResponse';

import { List } from '@prisma/client';
import { Tag } from '@prisma/client';
import { Entry } from '@prisma/client';

type MappedEntry = {
  id: string;
  text: string;
  createdAt: Date;
  starred?: boolean;
  completed?: boolean;
  date?: Date;
  amount?: number;
  hyperlink?: string;
};

type MappedTag = {
  id: string;
  name: string;
};

type MappedList = {
  id: string;
  title: string;
  icon: string;
  pinned: boolean;
  isChecklist: boolean;
  createdAt: Date;
  category: string;
  tags: MappedTag[];
  entries: MappedEntry[];
};

export class CategoryResponse {
  private readonly id: string;
  private readonly name: string;
  private readonly user: string;
  private readonly listCount: number;
  private readonly lists: MappedList[];

  constructor({ id, name, user, _count, lists }: CategoryDbResponse) {
    this.id = id;
    this.name = name;
    this.user = user.username;
    this.listCount = _count.lists;
    this.lists = lists.map((list) => this.mapList(list, name));
  }

  private mapList(list: List & { tags: Tag[]; entries: Entry[] }, categName: string): MappedList {
    return {
      id: list.id,
      title: list.title,
      icon: list.icon,
      pinned: list.pinned,
      isChecklist: list.isChecklist,
      createdAt: list.createdAt,
      category: categName,
      tags: list.tags.map((tag) => this.mapTag(tag)),
      entries: list.entries.map((entry) => this.mapEntry(entry)),
    };
  }

  private mapTag(tag: Tag): MappedTag {
    return {
      id: tag.id,
      name: tag.name,
    };
  }

  private mapEntry(entry: Entry): MappedEntry {
    return {
      id: entry.id,
      text: entry.text,
      createdAt: entry.createdAt,
      starred: entry.starred,
      completed: entry.completed,
      date: entry.date,
      amount: entry.amount,
      hyperlink: entry.hyperlink,
    };
  }
}
