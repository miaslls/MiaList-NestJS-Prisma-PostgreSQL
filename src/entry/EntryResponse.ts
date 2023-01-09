import { EntryDbResponse } from './EntryDbResponse';

export class EntryResponse {
  private readonly id: string;
  private readonly user: string;
  private readonly list: string;
  public readonly listId: string;
  public readonly text: string;
  private readonly createdAt: Date;
  public readonly starred: boolean;
  public readonly completed: boolean;
  private readonly date: Date;
  private readonly amount: number;
  private readonly hyperlink: string;

  constructor(entry: EntryDbResponse) {
    this.id = entry.id;
    this.user = entry.list.user.username;
    this.list = entry.list.title;
    this.listId = entry.list.id;
    this.text = entry.text;
    this.createdAt = entry.createdAt;
    this.starred = entry.starred;
    this.completed = entry.completed;
    this.date = entry.date;
    this.amount = entry.amount;
    this.hyperlink = entry.hyperlink;
  }
}
