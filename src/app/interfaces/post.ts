import { User } from './user';

export interface Post {
  _id: string,
  text: string,
  owner: User,
  createdAt: Date
}
