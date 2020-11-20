import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/interfaces/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import jwtDecode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(null);
    this.user = this.userSubject.asObservable();
  }

  public get userData(): User {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/users/login`, { username, password }, { withCredentials: true })
    .pipe(map(user => {
      const tokenData : any = jwtDecode(user.token);
      const userData = JSON.parse(JSON.stringify(tokenData.user));

      delete userData.password;

      this.userSubject.next(userData);

      this.startRefreshTokenTimer(tokenData.exp);
      localStorage.setItem('token', JSON.stringify(user.token));
      
      return user;
    }))
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');

    if (this.userData && token) {
      return true
    } else {
      return false;
    }
  }

  logout() {
    this.http.post<any>(`${environment.apiUrl}/users/revoke-token`, {}, { withCredentials: true }).subscribe();
    this.stopRefreshTokenTimer();
    this.userSubject.next(null);
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  refreshToken() {
    return this.http.post<any>(`${environment.apiUrl}/users/refresh-token`, {}, { withCredentials: true })
    .pipe(map((user) => {
      const tokenData : any = jwtDecode(user.token);
      const userData = JSON.parse(JSON.stringify(tokenData.user));

      delete userData.password;

      this.userSubject.next(userData);

      this.startRefreshTokenTimer(tokenData.exp);
      localStorage.setItem('token', JSON.stringify(user.token))
      return user;
    }))
  }

  private refreshTokenTimeout;

  private startRefreshTokenTimer(exp: number) {
    const expires = new Date(exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}