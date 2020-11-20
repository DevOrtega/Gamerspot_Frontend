export interface Userprofiledata {
  username: string,
  role: string,
  email?: string,
  name: string,
  country: string,
  bornDate?: string,
  linkList: {link:string}[],
  gameList: {gameName:string, gameUser:string}[],
  biography: string
}
