import { List } from 'src/list/entities/list.entity';

export class HomeResponse {
  pinnedLists: List[];
  unpinnedLists: List[];
}
