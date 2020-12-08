import { Gamer } from './gamer';
import { Sponsor } from './sponsor';

export interface Team {
  _id:string,
  name: string,
  sponsors?: Sponsor[],
  players?: Gamer[],
  owner?:any,
  createdAt:Date
}
