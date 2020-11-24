import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/services/countries/countries.service';
import { FeedsService } from 'src/app/services/feeds/feeds.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public feeds: any;
  private feedsToFilter: any;
  public countries: any;
  public getCountriesSubscription: any;
  public error: any;
  public loading: boolean;
  public submitted:boolean = false;
  public roles:string[] = ['Gamer', 'Team', 'Sponsor'];

  constructor(private feedService:FeedsService, private countriesService:CountriesService) {}

  ngOnInit() {
    this.showFeeds();

    this.getCountriesSubscription = this.countriesService.getCountries()
    .subscribe({
      next: countries => {
        const countriesObj : any = Object.values({ ...countries });
        this.countries = countriesObj.map((country: { name: any; }) => country.name);
      },
      error: error => {
        this.error = error;
        this.loading = false;
      }
    })
    console.log(this.feeds)
  }

  //home
  async getCountries() {
    this.countries = await this.countriesService.getCountries();
    return this.countries;
  }

  onChangeCountry(data) {

    if (data != 'All') this.feeds = this.feedsToFilter.filter(feed => feed.owner.country == data);
    else this.feeds = this.feedsToFilter;
    return this.feeds;
  }

  onChangeRole(data) {
    console.log(data);
    if (data === 'Gamer') {
      console.log(this.feeds);
      this.feeds = this.feedsToFilter.filter(feed => feed.owner.gamer != undefined);

    }
    if (data === 'Team') {
      this.feeds = this.feedsToFilter.filter(feed => feed.owner.team);
      console.log(this.feeds.owner.team);
    }
    if (data === 'Sponsor') {
      this.feeds = this.feedsToFilter.filter(feed => feed.owner.sponsor);
      console.log(this.feeds.owner.sponsor);
    }
    else {
      this.feeds = this.feedsToFilter;
    }
  }


  //feed-post
  saveFeed(event) {
    this.feedService.createPost(event).subscribe();
    setTimeout(() => {
      this.showFeeds();
    }, 500);
  }

  //feed-get
  showFeeds() {
   this.feedService.getPosts().subscribe(
     response => {
      this.feedsToFilter = response;
      this.feeds = response;
      this.feeds.sort( (a,b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });
      console.log(this.feeds);
      return this.feeds;
    });
  }
}
