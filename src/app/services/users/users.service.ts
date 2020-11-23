import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { Userprofiledata } from 'src/app/interfaces/userprofiledata';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private profileSubject: BehaviorSubject<Userprofiledata>;
  public profile: Observable<Userprofiledata>;

  constructor(private router: Router, private http: HttpClient) {
    this.profileSubject = new BehaviorSubject<Userprofiledata>(null);
    this.profile = this.profileSubject.asObservable();
  }

  public get profileData(): Userprofiledata {
    return this.profileSubject.value;
  }

  public getUsers() {
    return this.http.get<any>(`${environment.apiUrl}/users`)
    .pipe(map(user => {
      this.profileSubject.next(user);

      return user;
    }))
  }

  public getUserByUsername(username: string) {
    return this.http.get<any>(`${environment.apiUrl}/users/${username}`, { withCredentials: true })
    .pipe(map((user: Userprofiledata) => {
      this.profileSubject.next(user);

      return user;
    }))
  }

  public registerUser(userdata: User) {
    return this.http.post<any>(`${environment.apiUrl}/users/register`, userdata);
  }

  public editUser(username: string, user_data: Userprofiledata) {
    console.log(username);
    console.log(user_data);
    return this.http.patch(`${environment.apiUrl}/users/${username}`, user_data, {withCredentials: true})
    .pipe(map((user: Userprofiledata) => {
      this.profileSubject.next(user);

      return user;
    }))
  }
}
