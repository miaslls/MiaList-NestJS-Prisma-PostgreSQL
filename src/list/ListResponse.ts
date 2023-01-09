import { ListDbResponse } from './ListDbResponse';

import { formatEntry, formatTag } from 'src/utils/formatObjects/formatObjects';
import { FormattedEntry, FormattedTag } from 'src/utils/formatObjects/formattedObjectTypes';

export class ListResponse {
  private readonly id: string;
  public readonly title: string;
  private readonly icon: string;
  public readonly pinned: boolean;
  private readonly isChecklist: boolean;
  private readonly createdAt: Date;
  private readonly user: string;
  private readonly category: { id: string; name: string };
  private readonly tagCount: number;
  private readonly entryCount: number;
  private readonly tags: FormattedTag[];
  private readonly entries: FormattedEntry[];

  constructor(list: ListDbResponse) {
    this.id = list.id;
    this.title = list.title;
    this.icon = list.icon;
    this.pinned = list.pinned;
    this.isChecklist = list.isChecklist;
    this.createdAt = list.createdAt;
    this.user = list.user.username;
    this.category = { id: list.category.id, name: list.category.name };
    this.tagCount = list._count.tags;
    this.entryCount = list._count.entries;
    this.tags = list.tags.map((tag) => formatTag(tag));
    this.entries = list.entries.map((entry) => formatEntry(entry));
  }
}
