export interface Userprofiledata {
  country: string,
  bornDate: string,
  linkList: {link:string}[],
  gameList: {gameName:string, gameUser:string}[],
  biography: string
}
