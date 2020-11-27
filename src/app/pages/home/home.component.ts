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
  public searched:string = '';
  public countrySelected:string = 'All countries';
  public roleSelected:string = 'All roles';
  public errorSearch:boolean = false;

  constructor(private feedService:FeedsService, private countriesService:CountriesService) {}

  ngOnInit() {
    this.showFeeds();
    this.feedService.refresh();
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
  }

  //home
  async getCountries() {
    this.countries = await this.countriesService.getCountries();
    return this.countries;
  }

  filterFeeds () {
    this.errorSearch = false;
    if (this.countrySelected != 'All countries') {
      this.feeds = this.feedsToFilter.filter(feed => feed.owner.country == this.countrySelected);
    }
    else this.feeds = this.feedsToFilter;

    if (this.feeds.length === 0) this.errorSearch = true;

    this.nextFilter(this.feeds);
  }

  nextFilter(arr:any) {
    console.log(arr);
    if (this.roleSelected != 'All roles') {
      if (this.roleSelected === 'Gamer') this.feeds = arr.filter(feed => feed.owner.gamer);
      else if (this.roleSelected === 'Team') this.feeds = arr.filter(feed => feed.owner.team);
      else if (this.roleSelected === 'Sponsor') this.feeds = arr.filter(feed => feed.owner.sponsor);
    }
    else this.feeds = arr;

    if (this.feeds.length === 0) this.errorSearch = true;
  }

  search() {
    this.errorSearch = false;
    if (this.searched === '') {
      this.feeds = this.feedsToFilter;
    }
    else {
      this.feeds = this.feedsToFilter.filter(feed => feed.owner.username === this.searched);
      if (this.feeds.length == 0) {
        this.feeds = this.feedsToFilter.filter( feed =>
          feed.owner.gamer && feed.owner.gamer.name === this.searched
          || feed.owner.team && feed.owner.team.name === this.searched
          || feed.owner.sponsor && feed.owner.sponsor.name === this.searched
        );
        if (this.feeds.length == 0) this.errorSearch = true;
      }
    }
    return this.feeds;
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

      return this.feeds;
    });
  }

  removePost(feed) {
    this.feeds = this.feeds.filter(f => {
      return f._id != feed._id
    });
    this.feedService.removePost(feed)
    .subscribe(response => {
      return response;
    })
  }
}
