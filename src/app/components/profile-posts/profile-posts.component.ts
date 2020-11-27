import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post';
import { FeedsService } from 'src/app/services/feeds/feeds.service';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.css']
})
export class ProfilePostsComponent implements OnInit {
  public posts: Post[];

  constructor(
    private postService: FeedsService
  ) {}

  ngOnInit(): void {
      setTimeout(() => {
        this.posts = this.postService.postsData as Post[];
        
        this.posts.sort((a,b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        });
      }, 300);
  }

  public exist(): boolean {
    if (this.posts) {
      return true;
    }

    return false;
  }

  isEmpty(): boolean {
    if (this.exist() && this.posts.length === 0) return true;

    return false;
  }
}
