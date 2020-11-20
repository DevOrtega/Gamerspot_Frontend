export interface Userprofileform {
  email: string,
  name: string,
  country: string,
  bornDate?: Date,
  linkList: {link:string}[],
  gameList: {gameName:string, gameUser:string}[],
  biography: string
}
