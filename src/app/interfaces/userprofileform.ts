export interface Userprofileform {
  country: string,
  bornDate: Date,
  linkList: {link:string}[],
  gameList: {gameName:string, gameUser:string}[],
  biography: string
}
