import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private serverUrl = 'http://ec2-15-237-13-78.eu-west-3.compute.amazonaws.com:3000/users';

  constructor() { }

  getUsers() {
    return axios.get(this.serverUrl).then(response => response.data);
  }

  getUserByUsername(username) {
    return axios.get(`${this.serverUrl}/${username}`).then(response => response.data);
  }

  registerUser(user) {
    return axios.post(`${this.serverUrl}/register`, user).then(response => response.data);
  }

  /*addUserProfile(profile) {
    return axios.post(`${this.serverUrl}`, profile).then(response => response.data);
  }*/
}
