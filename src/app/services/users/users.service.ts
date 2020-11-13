import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private serverUrl = '';

  constructor() { }

  getUsers() {
    return axios.get(this.serverUrl).then(response => response.data);
  }

  getUserByUsername(username) {
    return axios.get(`${this.serverUrl}/${username}`).then(response => response.data);
  }

  addUserProfile(profile) {
    return axios.post(`${this.serverUrl}`, profile).then(response => response.data);
  }
}
