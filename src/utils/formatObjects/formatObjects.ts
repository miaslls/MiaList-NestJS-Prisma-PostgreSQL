import { Category } from '@prisma/client';
import { Tag } from '@prisma/client';
import { List } from '@prisma/client';
import { Entry } from '@prisma/client';

import { FormattedEntry, FormattedList, Formattedag } from './formattedObjectTypes';

export function formatList(list: List & { category: Category; tags: Tag[]; entries: Entry[] }): FormattedList {
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
    tags: list.tags.map((tag) => formatTag(tag)),
    entries: list.entries.map((entry) => formatEntry(entry)),
  };
}

export function formatTag(tag: Tag): Formattedag {
  return {
    id: tag.id,
    name: tag.name,
  };
}

export function formatEntry(entry: Entry): FormattedEntry {
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
