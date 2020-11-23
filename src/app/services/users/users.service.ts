import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Userprofiledata } from 'src/app/interfaces/userprofiledata';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private profileSubject: BehaviorSubject<Userprofiledata>;
  public profile: Observable<Userprofiledata>;

  private error:string = '';
  private loading:boolean = false;

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {
    this.profileSubject = new BehaviorSubject<Userprofiledata>(null);
    this.profile = this.profileSubject.asObservable();
  }

  public get profileData(): Userprofiledata {
    return this.profileSubject.value;
  }

  getUserByUsername(username: string) {
    return this.http.get<any>(`${environment.apiUrl}/users/${username}`, { withCredentials: true })
    .pipe(map(user => {
      this.profileSubject.next(user);
      return user;
    })
    )
  }

  registerUser(user) {
    return this.http.post<any>(`${environment.apiUrl}/users/register`, user)
    .subscribe({
      next: () => {
        this.loginUser(user.username, user.password);
      }
    });
  }

  loginUser(username, password) {
    this.authService.login(username, password)
    .pipe(first())
    .subscribe({
        next: () => {
          this.router.navigateByUrl('home');
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
    });
  }



  /*
  private token:string = '';
  private user:User;

  constructor() {}

  async getUsers() {
    return axios.get(environment.apiUrl).then(response => response.data);
  }

  async getUserByUsername(username) {
    if (username != null) {
      return axios.get(`${environment.apiUrl}/${username}`)
      .then(response => response.data);
    }
  }

  async getDecodeAccessToken():Promise<any> {
      this.token = JSON.parse(localStorage.getItem('token'));
      let promise = new Promise((resolve, reject) => {
        resolve(jwt_decode(this.token));
      });
      return promise;
  }

  postToken(userData) {
    return axios.post(`${environment.apiUrl}/login`, userData)
    .then(response => {
      localStorage.setItem('token', JSON.stringify(response.data.token));
      return response.data;
    });
  }

  revokeToken() {
    return axios.post(`${environment.apiUrl}/revoke-token`, {} , { withCredentials: true })
    .then(response => response.data);
  }

  setUserProfile(username) {
    this.user = username;
  }

  registerUser(user) {
    return axios.post(`${environment.apiUrl}/register`, user).then(response => response.data);
  }

  editUserProfile(user, profile) {
    return axios.patch(`${environment.apiUrl}/${user}`, profile, {
      headers: {
        Authorization: 'Bearer ' + this.token
      },
      withCredentials: true
    }).then(response => response.data);
  }
  */
}
