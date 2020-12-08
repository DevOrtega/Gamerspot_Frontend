import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tag } from 'src/app/interfaces/tag';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  private tagSubject: BehaviorSubject<Tag>;
  public tag: Observable<Tag>;

  constructor(private http: HttpClient) {
    this.tagSubject = new BehaviorSubject<Tag>(null);
    this.tag = this.tagSubject.asObservable();
  }

  public get tagsData(): Tag | Tag[] {
    return this.tagSubject.value;
  }


}
