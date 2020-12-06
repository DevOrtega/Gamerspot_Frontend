import { Link } from './link';
import { Game } from './game';
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
  links: Link[],
  games: Game[],
  posts?: Post[],
  createdAt?: string  
}
