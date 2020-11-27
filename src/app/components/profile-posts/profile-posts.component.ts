import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { Post } from 'src/app/interfaces/post';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FeedsService } from 'src/app/services/feeds/feeds.service';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.css']
})
export class ProfilePostsComponent implements OnInit, OnDestroy {
  public posts: Post[];
  private usernameParam: string;

  private getParamsSubscription: Subscription;
  private removePostSubscription: Subscription;

  

  constructor(
    private postService: FeedsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getParamsSubscription = this.route.parent.params.subscribe(params => {
      this.usernameParam = params['username'];
    })

    this.showPosts();
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

  private showPosts() {
    this.postService.getPosts(this.usernameParam).subscribe(posts => {
      this.posts = posts;

      this.posts.sort( (a,b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });

      return this.posts;
    });
  }

  removePost(post) {
    this.removePostSubscription = this.postService.removePost(post).subscribe(() => {
      this.showPosts()
    })
  }

  ngOnDestroy(): void {
    if (this.getParamsSubscription) {
      this.getParamsSubscription.unsubscribe();
    }

    if (this.removePostSubscription) {
      this.removePostSubscription.unsubscribe();
    }
  }
}
