import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedsService {

  constructor(private http: HttpClient) { }

  getFeeds() {
    return this.http.get<any>(`${environment.apiUrl}/posts`, { withCredentials: true });
  }

  postFeed(feed) {

    return this.http.post<any>(`${environment.apiUrl}/posts`, {'text': feed}, { withCredentials: true });
  }
}
