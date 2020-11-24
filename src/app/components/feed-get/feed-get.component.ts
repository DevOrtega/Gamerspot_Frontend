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

  public feedMade:Feed;
  private dateFormated:string;

  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.makeFeed();
  }

  makeFeed() {
      const dateWithoutZ = this.feed.createdAt.toString().substring(0, this.feed.createdAt.toString().length - 1);
      this.dateFormated = this.datePipe.transform(dateWithoutZ,"MMMM dd, yyyy - H:mm:ss");

      let roleUser: string = '';

      if (this.isGamer()) {

        roleUser = this.feed.owner.gamer.name;
      } else if (this.isTeam()) {
        roleUser = this.feed.owner.team.name;
      } else {
        roleUser = this.feed.owner.sponsor.name;
      }

      this.feedMade = {
        username: this.feed.owner.username,
        name: roleUser,
        text: this.feed.text,
        photo: this.feed.owner.photoUrl,
        created: this.dateFormated
      }
  }

  public isGamer(): boolean {
    if (this.feed.owner.gamer && Object.entries(this.feed.owner.gamer).length > 0) {
      return true;
    }

    return false;
  }

  public isTeam(): boolean {
    if (this.feed.owner.team && Object.entries(this.feed.owner.team).length > 0) {
      return true;
    }

    return false;
  }

  public isSponsor(): boolean {
    if (this.feed.owner.sponsor && Object.entries(this.feed.owner.sponsor).length > 0) {
      return true;
    }

    return false;
  }

  public getRole(): string {
    if (this.isGamer()) {
      return "Gamer";
    }

    if (this.isTeam()) {
      return "Team";
    }

    if (this.isSponsor()) {
      return "Sponsor";
    }
  }
}
