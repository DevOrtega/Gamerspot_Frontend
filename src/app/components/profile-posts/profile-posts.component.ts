import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Post } from 'src/app/interfaces/post';
import { FeedsService } from 'src/app/services/feeds/feeds.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.css']
})
export class ProfilePostsComponent implements OnInit, OnDestroy {
  public posts: Post[];
  private usernameParam: string;

  private getParamsSubscriptor: Subscription;
  private getPostsSubscriptor: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postService: FeedsService
  ) {}

  ngOnInit(): void {
    this.getParamsSubscriptor = this.route.parent.params.subscribe(params => {
      this.usernameParam = params['username'];
    })

    this.getPostsSubscriptor = this.postService.getPosts(this.usernameParam)
    .pipe(first())
    .subscribe({
      next: posts => {
        this.posts = posts;
        console.log(posts);
      }
    })
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

  ngOnDestroy(): void {
    if (this.getParamsSubscriptor) {
      this.getParamsSubscriptor.unsubscribe();
    }

    if (this.getPostsSubscriptor) {
      this.getPostsSubscriptor.unsubscribe();
    }
  }
}
