import { UserDbResponse } from './UserDbResponse';

export class UserResponse {
  private readonly id: string;
  private readonly username: string;
  private readonly role: string;
  private readonly categoryCount: number;
  private readonly tagCount: number;
  private readonly listCount: number;

  constructor({ id, username, role, _count }: UserDbResponse) {
    this.id = id;
    this.username = username;
    this.role = role;
    this.categoryCount = _count.categories;
    this.tagCount = _count.tags;
    this.listCount = _count.lists;
  }
}
