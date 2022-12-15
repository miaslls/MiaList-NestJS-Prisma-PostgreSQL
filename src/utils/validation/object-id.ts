import { ObjectId } from 'mongodb';

export function validObjectId(id: string): boolean {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) {
      return true;
    }
    return false;
  }
  return false;
}
