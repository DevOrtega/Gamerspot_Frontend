import { Gamer } from './gamer';
import { Team } from './team';

export interface Sponsor {
  name: string,
  teams?: Team[],
  players?: Gamer[],
  owner?:any
}
