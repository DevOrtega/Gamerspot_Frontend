import { Sponsor } from './sponsor';

export interface Gamerprofiledata {
  _id:string,
  name: string,
  bornDate?:string,
  team?:any,
  sponsors?: Sponsor[],
  owner?:any
}
