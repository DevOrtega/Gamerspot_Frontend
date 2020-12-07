import { Sponsor } from './sponsor';

export interface Gamer {
  _id:string,
  name: string,
  bornDate?:string,
  team?:any,
  sponsors?: Sponsor[],
  owner?:any,
  createdAt: Date
}
