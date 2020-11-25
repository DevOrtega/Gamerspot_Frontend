import { User } from './user';

export interface Post {
  text: string,
  owner: User,
  createdAt: Date
}
