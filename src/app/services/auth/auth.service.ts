import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';

import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  private _refreshTokenTimeout;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UsersService
  ) {
    this.userSubject = new BehaviorSubject<User>(null);
    this.user = this.userSubject.asObservable();
  }

  public get userData(): User {
    return this.userSubject.value;
  }

  public login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/users/login`, { username, password }, { withCredentials: true })
    .pipe(map(async user => {
      const tokenData : any = jwtDecode(user.token);

      const userData = await this.userService.getUserByUsername(username).pipe(first()).toPromise();

      this.userSubject.next(userData);

      this.startRefreshTokenTimer(tokenData.exp);
      localStorage.setItem('token', JSON.stringify(user.token));

      return user;
    }))
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('token');

    if (this.userData && token) return true;

    return false;
  }

  public itsMe(username: string): boolean {
    return this.userData.username === username;
  }

  public logout() {
    this.http.post<any>(`${environment.apiUrl}/users/revoke-token`, {}, { withCredentials: true }).subscribe();

    this.stopRefreshTokenTimer();

    this.userSubject.next(null);

    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }

  public refreshToken() {
    return this.http.post<any>(`${environment.apiUrl}/users/refresh-token`, {}, { withCredentials: true })
    .pipe(map(async user => {
      const tokenData : any = jwtDecode(user.token);

      const userData = await this.userService.getUserByUsername(tokenData.user.username).pipe(first()).toPromise();

      this.userSubject.next(userData);

      this.startRefreshTokenTimer(tokenData.exp);
      localStorage.setItem('token', JSON.stringify(user.token))

      return user;
    }))
  }

  private startRefreshTokenTimer(exp: number) {
    const expires = new Date(exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this._refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this._refreshTokenTimeout);
  }
}
