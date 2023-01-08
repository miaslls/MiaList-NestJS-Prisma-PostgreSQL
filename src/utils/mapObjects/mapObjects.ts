import { Category } from '@prisma/client';
import { Tag } from '@prisma/client';
import { List } from '@prisma/client';
import { Entry } from '@prisma/client';

import { MappedEntry, MappedList, MappedTag } from './mappedObjectTypes';

export function mapList(list: List & { category: Category; tags: Tag[]; entries: Entry[] }): MappedList {
  return {
    id: list.id,
    title: list.title,
    icon: list.icon,
    pinned: list.pinned,
    isChecklist: list.isChecklist,
    createdAt: list.createdAt,
    category: {
      id: list.category.id,
      name: list.category.name,
    },
    tags: list.tags.map((tag) => mapTag(tag)),
    entries: list.entries.map((entry) => mapEntry(entry)),
  };
}

export function mapTag(tag: Tag): MappedTag {
  return {
    id: tag.id,
    name: tag.name,
  };
}

export function mapEntry(entry: Entry): MappedEntry {
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
