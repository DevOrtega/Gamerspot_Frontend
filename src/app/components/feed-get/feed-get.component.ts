import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post';
import { PostView } from 'src/app/interfaces/post-view';
import { FeedsService } from 'src/app/services/feeds/feeds.service';
import { UsersService } from 'src/app/services/users/users.service';
@Component({
  selector: 'app-feed-get',
  templateUrl: './feed-get.component.html',
  styleUrls: ['./feed-get.component.css']
})
export class FeedsGetComponent implements OnInit {
  @Input() feed;

  public post: PostView;


  constructor(private datePipe: DatePipe, private userService: UsersService) { }

  ngOnInit(): void {
    this.makeFeed();
  }

  private makeFeed() {
      const dateWithoutZ = this.feed.createdAt.toString().substring(0, this.feed.createdAt.toString().length - 1);
      let dateFormated = this.datePipe.transform(dateWithoutZ,"MMMM dd, yyyy - H:mm:ss");

      this.post = {
        username: this.feed.owner.username,
        name: this.userService.getName(this.feed.owner),
        role: this.userService.getRole(this.feed.owner),
        text: this.feed.text,
        photoUrl: this.feed.owner.photoUrl,
        createdAt: dateFormated
      }
  }
}
