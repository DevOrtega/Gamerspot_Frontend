import { Component, Input, OnInit } from '@angular/core';
import { PostView } from 'src/app/interfaces/post-view';
import { UsersService } from 'src/app/services/users/users.service';
@Component({
  selector: 'app-feed-get',
  templateUrl: './feed-get.component.html',
  styleUrls: ['./feed-get.component.css']
})
export class FeedsGetComponent implements OnInit {
  @Input() feed;
  public post: PostView;

  constructor(
    private userService: UsersService)
  { }

  ngOnInit(): void {
    this.makeFeed();
  }

  private makeFeed() {
    this.post = {
      username: this.feed.owner.username,
      name: this.userService.getName(this.feed.owner),
      role: this.userService.getRole(this.feed.owner),
      text: this.feed.text,
      photoUrl: this.feed.owner.photoUrl,
      createdAt: this.userService.formatDateToMMMMDDYYYY(this.feed.createdAt)
    }

    console.log(this.post)
  }
}
