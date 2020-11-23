import { Component, OnInit } from '@angular/core';
import { FeedsService } from 'src/app/services/feeds/feeds.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public feeds: any;

  constructor(private feedService:FeedsService) {
  }

  ngOnInit() {
    this.showFeeds();
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
