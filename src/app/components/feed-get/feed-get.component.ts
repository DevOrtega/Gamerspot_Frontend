import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Feed } from 'src/app/interfaces/feed';
@Component({
  selector: 'app-feed-get',
  templateUrl: './feed-get.component.html',
  styleUrls: ['./feed-get.component.css']
})
export class FeedsGetComponent implements OnInit {

  @Input() feed;

  public feedMaked:Feed;
  private dateFormated:string;

  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.makeFeed();
  }

  makeFeed() {
    const dateWithoutZ = this.feed.createdAt.toString().substring(0, this.feed.createdAt.toString().length - 1);
    this.dateFormated = this.datePipe.transform(dateWithoutZ,"MMMM dd, yyyy - H:mm:ss");

    this.feedMaked = {
      username: this.feed.owner.username,
      name: this.feed.owner.name,
      text: this.feed.text,
      photo: this.feed.owner.photoUrl,
      created: this.dateFormated
    }
  }
}
