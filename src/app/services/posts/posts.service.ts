import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from 'src/app/interfaces/post';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private postSubject: BehaviorSubject<Post>;
  public post: Observable<Post>;

  constructor(private http: HttpClient) {
    this.postSubject = new BehaviorSubject<Post>(null);
    this.post = this.postSubject.asObservable();
  }

  public get postsData(): Post | Post[] {
    return this.postSubject.value;
  }

  public getPosts(username?: string) {
    if (username) {
      return this.http.get<any>(`${environment.apiUrl}/posts?username=${username}`, { withCredentials: true })
      .pipe(map(posts => {
        this.postSubject.next(posts);
        return posts;
      }));
    }

    return this.http.get<any>(`${environment.apiUrl}/posts`, { withCredentials: true })
    .pipe(map(posts => {
      this.postSubject.next(posts);
      return posts;
    }));
  }


  public createPost(post) {
    return this.http.post<any>(`${environment.apiUrl}/posts`, post, { withCredentials: true });
  }

  public deletePost(post) {
    return this.http.delete<any>(`${environment.apiUrl}/posts/${post._id}`, post);
  }
}
