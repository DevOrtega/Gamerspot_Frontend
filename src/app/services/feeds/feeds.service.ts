import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedsService {

  constructor(private http: HttpClient) { }

  public refresh() {
    setInterval(()=>{
      console.log('Recarga!!')
      this.getPosts();
    }, 60000);
  }

  public getPosts() {
    return this.http.get<any>(`${environment.apiUrl}/posts`, { withCredentials: true })
  }

  public createPost(feed) {
    return this.http.post<any>(`${environment.apiUrl}/posts`, {'text': feed}, { withCredentials: true });
  }

  public removePost(feed) {
    return this.http.delete<any>(`${environment.apiUrl}/posts/${feed._id}`, feed);
  }
}
