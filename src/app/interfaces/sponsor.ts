import { Gamer } from './gamer';
import { Team } from './team';

export interface Sponsor {
  _id:string,
  name: string,
  teams?: Team[],
  players?: Gamer[],
  owner?:any,
  createdAt:Date
}
