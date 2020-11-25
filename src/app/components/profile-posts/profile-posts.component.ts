import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.css']
})
export class ProfilePostsComponent implements OnInit, OnDestroy {
  public posts: Post[];

  private getPostsSubscriptor: Subscription;

  constructor(private authService: AuthService, private userService: UsersService) {
    this.posts = this.authService.userData.posts;
  }

  ngOnInit(): void {
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
    if(this.getPostsSubscriptor) {
      this.getPostsSubscriptor.unsubscribe();
    }
  }
}
