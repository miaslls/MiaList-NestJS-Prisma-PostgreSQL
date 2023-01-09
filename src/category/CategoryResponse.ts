import { CategoryDbResponse } from './CategoryDbResponse';

import { FormattedList } from 'src/utils/formatObjects/formattedObjectTypes';
import { formatList } from 'src/utils/formatObjects/formatObjects';

export class CategoryResponse {
  private readonly id: string;
  private readonly name: string;
  private readonly user: string;
  private readonly listCount: number;
  private readonly lists: FormattedList[];

  constructor({ id, name, user, _count, lists }: CategoryDbResponse) {
    this.id = id;
    this.name = name;
    this.user = user.username;
    this.listCount = _count.lists;
    this.lists = lists.map((list) => formatList(list));
  }
}
