import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.css']
})
export class ProfilePostsComponent implements OnInit {
  public posts: { text: string }[];

  constructor(private userService: UsersService) {
    this.userService.profile.subscribe(x => this.posts = x.posts);
  }

  ngOnInit(): void {
  }

  existPosts(): boolean {
    if (this.posts && this.posts.length > 0) return true;
   
    return false;
  }
}
