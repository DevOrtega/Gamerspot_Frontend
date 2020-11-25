import { Post } from './post';

export interface User {
  username: string,
  email?: string,
  gamer?: any,
  team?: any,
  sponsor?: any,
  name: string,
  photoUrl?: string,
  country: string,
  bornDate?: string,
  biography: string
  links: { link: string }[],
  games: { gameName: string, gameUser: string }[],
  posts?: Post[],
  createdAt?: string  
}
