import { Gamer } from './gamer';
import { Team } from './team';

export interface Sponsorprofiledata {
  name: string,
  teams?: Team[],
  players?: Gamer[],
  owner?:any
}
