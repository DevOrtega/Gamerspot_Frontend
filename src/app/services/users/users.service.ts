import { Injectable } from '@angular/core';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private serverUrl:string = 'http://ec2-15-237-13-78.eu-west-3.compute.amazonaws.com:3000/users';
  private token:string = JSON.parse(localStorage.getItem('token'));
  private user:string;
  private localUser = JSON.parse(localStorage.getItem('user'));

  constructor() { }

  getUsers() {
    return axios.get(this.serverUrl).then(response => response.data);
  }

  getUserByUsername() {
    return axios.get(`${this.serverUrl}/${this.localUser}`, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    }).then(response => response.data);
  }

  postToken(userData) {
    return axios.post(`${this.serverUrl}/login`, userData).then(response => response.data);
  }

  setUserProfile(username) {
    this.user = username;
  }

  registerUser(user) {
    return axios.post(`${this.serverUrl}/register`, user).then(response => response.data);
  }

  editUserProfile(user, profile) {
    return axios.patch(`${this.serverUrl}/${user}`, profile, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    }).then(response => response.data);
  }

  getDecodeAccessToken(token:string) {
    try {
      return jwt_decode(token);
    }
    catch(Error) {
      return null;
    }
  }
}
