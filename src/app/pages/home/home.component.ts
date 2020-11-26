import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FeedsService } from 'src/app/services/feeds/feeds.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public feeds: any;

  constructor(
    private authService: AuthService,
    private feedService: FeedsService
    ) {
  }

  ngOnInit() {
    this.showFeeds();
  }

  saveFeed(event) {
    this.feedService.createPost(event).subscribe();
    setTimeout(() => {
      this.showFeeds();
    }, 500);
  }

  showFeeds() {
   this.feedService.getPosts().subscribe(
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

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
