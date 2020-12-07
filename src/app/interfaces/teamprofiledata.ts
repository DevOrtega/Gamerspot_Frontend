import { Gamer } from './gamer';
import { Sponsor } from './sponsor';

export interface Teamprofiledata {
  name: string,
  sponsors?: Sponsor[],
  players?: Gamer[],
  owner?:any
}
