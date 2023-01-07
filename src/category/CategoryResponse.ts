import { CategoryDbResponse } from './CategoryDbResponse';

import { MappedList } from 'src/utils/mapObjects/mappedObjectTypes';
import { mapList } from 'src/utils/mapObjects/mapObjects';

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
    this.lists = lists.map((list) => mapList(list));
  }
}
