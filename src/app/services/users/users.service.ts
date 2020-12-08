import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private profileSubject: BehaviorSubject<User>;
  public profile: Observable<User>;

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
    ) {
    this.profileSubject = new BehaviorSubject<User>(null);
    this.profile = this.profileSubject.asObservable();
  }

  public get profileData(): User {
    return this.profileSubject.value;
  }

  public getUsers() {
    return this.http.get<any>(`${environment.apiUrl}/users`)
    .pipe(map(users => {
      this.profileSubject.next(users);

      return users;
    }))
  }

  public getUserByUsername(username: string) {
    return this.http.get<any>(`${environment.apiUrl}/users/${username}`, { withCredentials: true })
    .pipe(map((user: User) => {
      this.profileSubject.next(user);
      return user;
    }))
  }

  public registerUser(userdata: User) {
    return this.http.post<any>(`${environment.apiUrl}/users/register`, userdata);
  }

  public editUser(username: string, user_data: User) {
    return this.http.patch(`${environment.apiUrl}/users/${username}`, user_data, {withCredentials: true})
    .pipe(map((user: User) => {
      this.profileSubject.next(user);
      return user;
    }))
  }

  public isGamer(user: User): boolean {
    if (user.gamer && Object.entries(user.gamer).length > 0) {
      return true;
    }

    return false;
  }

  public isTeam(user: User): boolean {
    if (user.team && Object.entries(user.team).length > 0) {
      return true;
    }

    return false;
  }

  public isSponsor(user: User): boolean {
    if (user.sponsor && Object.entries(user.sponsor).length > 0) {
      return true;
    }

    return false;
  }

  public getName(user): string {
    if (this.isGamer(user)) {
      return user.gamer.name;
    }

    if (this.isTeam(user)) {
      return user.team.name;
    }

    if (this.isSponsor(user)) {
      return user.sponsor.name;
    }
  }

  public getRole(user): string {
    if (this.isGamer(user)) {
      return "Gamer";
    }

    if (this.isTeam(user)) {
      return "Team";
    }

    if (this.isSponsor(user)) {
      return "Sponsor";
    }
  }

  public formatDateToDDMMYYYY(date: Date | string) {
    return this.datePipe.transform(date, "dd/MM/yyyy");
  }

  public formatDateToYYYYMMDD(date: Date | string) {
    return this.datePipe.transform(date, "yyyy/MM/dd");
  }

  public formatDateToMMMMDDYYYY(date: Date | string) {
    return this.datePipe.transform(date, "MMMM dd, yyyy - H:mm:ss");
  }
}
