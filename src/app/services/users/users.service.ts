import { Injectable } from '@angular/core';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { User } from 'src/app/interfaces/user'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  //private serverUrl:string = 'http://ec2-15-237-13-78.eu-west-3.compute.amazonaws.com:3000/users';
  private serverUrl:string = 'http://localhost:3000/users';
  private token:string = '';
  private user:User;

  constructor() {
    axios.defaults.withCredentials = true;
  }

  getUsers() {
    return axios.get(this.serverUrl).then(response => response.data);
  }

  async getUserByUsername(username) {
    if (username != null) {
      return axios.get(`${this.serverUrl}/${username}`, {
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      }).then(response => response.data);
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
    return axios.post(`${this.serverUrl}/login`, userData)
    .then(response => {
      localStorage.setItem('token', JSON.stringify(response.data.token));
      return response.data;
    });
  }

  revokeToken() {
    return axios.post(`${this.serverUrl}/revoke-token`)
    .then(response => response.data);
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


}
