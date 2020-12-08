import { Tag } from './tag';
import { User } from './user';

export interface Post {
  _id: string,
  text: string,
  owner: User,
  tags?: Tag[],
  createdAt: Date
}
