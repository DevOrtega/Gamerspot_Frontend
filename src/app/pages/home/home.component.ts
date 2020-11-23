import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FeedsService } from 'src/app/services/feeds/feeds.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user: User;
  public feeds: any;

  constructor(private authenticationService: AuthService, private feedService:FeedsService) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  ngOnInit() {
    this.showFeeds();
  }

  logout() {
    this.authenticationService.logout();
  }

  saveFeed(event) {
    this.feedService.postFeed(event).subscribe();
    setTimeout(() => {
      this.showFeeds();
    }, 500);
  }

  showFeeds() {
   this.feedService.getFeeds().subscribe(
     response => {
      this.feeds = response;
      this.feeds.sort( (a,b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });
      return this.feeds;
     }
   )
  }

}
