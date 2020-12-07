import { Gamer } from './gamer';
import { Sponsor } from './sponsor';

export interface Team {
  name: string,
  sponsors?: Sponsor[],
  players?: Gamer[],
  owner?:any
}
