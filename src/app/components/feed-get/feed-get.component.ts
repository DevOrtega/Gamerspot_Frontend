import { PostView } from 'src/app/interfaces/post-view';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Feed } from 'src/app/interfaces/feed';
import { UsersService } from 'src/app/services/users/users.service';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-feed-get',
  templateUrl: './feed-get.component.html',
  styleUrls: ['./feed-get.component.css']
})
export class FeedsGetComponent implements OnInit {
  @Input() feed;
  @Input() modalIndex;
  @Output() feedToDelete = new EventEmitter();

  public post:PostView;

  constructor(private userService: UsersService, private authService: AuthService) { }

  ngOnInit(): void {

    this.makeFeed();
  }

  emitToDelete() {
    this.feedToDelete.emit(this.post);
  }

  itsMe() {
    return this.authService.itsMe(this.feed.owner.username);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  private makeFeed() {
    this.post = {
      _id: this.feed._id,
      username: this.feed.owner.username,
      name: this.userService.getName(this.feed.owner),
      role: this.userService.getRole(this.feed.owner),
      text: this.feed.text,
      photoUrl: this.feed.owner.photoUrl,
      createdAt: this.userService.formatDateToMMMMDDYYYY(this.feed.createdAt)
    }
  }
}
