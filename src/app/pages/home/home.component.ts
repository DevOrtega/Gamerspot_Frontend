import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/services/countries/countries.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FeedsService } from 'src/app/services/feeds/feeds.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public feeds: any;
  private feedsToFilter: any;
  private feedsForCountry: any;
  private feedsForRole: any;
  private feedsForSearch: any
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

  constructor(
    private authService: AuthService,
    private feedService: FeedsService,
    private countryService: CountriesService,
    ) {
  }

  ngOnInit() {
    this.showFeeds();
    this.getCountriesSubscription = this.countryService.getCountries()
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
    this.countries = await this.countryService.getCountries();
    return this.countries;
  }

  filterFeeds () {
    this.errorSearch = false;

    if (this.countrySelected != 'All countries') {
      this.feedsForCountry = this.feedsToFilter.filter(feed => feed.owner.country === this.countrySelected);
    } else {
      this.feedsForCountry = Array.from(this.feedsToFilter);
    }

    let intersect = this.feedsForRole.filter(value => this.feedsForSearch.includes(value))
    this.feeds = this.feedsForCountry.filter(value => intersect.includes(value))


    if (this.feeds.length === 0) {
      this.errorSearch = true;
    } else {
      this.errorSearch = false;
    }

    this.nextFilter();
  }

  nextFilter() {
    if (this.roleSelected === 'Gamer') {
      this.feedsForRole = this.feedsToFilter.filter(feed => feed.owner.gamer);
    } else if (this.roleSelected === 'Team') {
      this.feedsForRole = this.feedsToFilter.filter(feed => feed.owner.team);
    } else if (this.roleSelected === 'Sponsor') {
      this.feedsForRole = this.feedsToFilter.filter(feed => feed.owner.sponsor);
    } else {
      this.feedsForRole = Array.from(this.feedsToFilter);
    }

    let intersect = this.feedsForCountry.filter(value => this.feedsForSearch.includes(value));
    this.feeds = this.feedsForRole.filter(value => intersect.includes(value));

    if (this.feeds.length === 0) {
      this.errorSearch = true;
    } else {
      this.errorSearch = false;

      this.feeds.sort( (a,b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });
    }
  }

  search() {
    this.errorSearch = false;

    if (this.searched === '') {
      this.feedsForSearch = Array.from(this.feedsToFilter);
    }
    else {
      //this.feeds = this.feedsToFilter.filter(feed => feed.owner.username === this.searched);
      this.feedsForSearch = this.feedsToFilter.filter(feed => {
        if (feed.owner.gamer) {
          return feed.owner.username.toLocaleLowerCase().startsWith(this.searched.toLocaleLowerCase())
          || feed.owner.gamer.name.toLocaleLowerCase().startsWith(this.searched.toLocaleLowerCase());
        }

        if (feed.owner.team) {
          return feed.owner.username.toLocaleLowerCase().startsWith(this.searched.toLocaleLowerCase())
          || feed.owner.team.name.toLocaleLowerCase().startsWith(this.searched.toLocaleLowerCase());
        }

        if (feed.owner.sponsor) {
          return feed.owner.username.toLocaleLowerCase().startsWith(this.searched.toLocaleLowerCase())
          || feed.owner.sponsor.name.toLocaleLowerCase().startsWith(this.searched.toLocaleLowerCase());
        }
      })
    }

    let intersect = this.feedsForCountry.filter(value => this.feedsForRole.includes(value));
    this.feeds = this.feedsForSearch.filter(value => intersect.includes(value));


    if (this.feeds.length === 0) {
      this.errorSearch = true;
    } else {
      this.errorSearch = false;

      this.feeds.sort( (a,b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });
    }

    return this.feeds;
  }


  //feed-post
  saveFeed(event) {
    this.feedService.createPost(event).subscribe(() => {
      this.showFeeds();
    });
  }

  //feed-get
  showFeeds() {
   this.feedService.getPosts().subscribe(
     response => {
      this.feedsToFilter = Array.from(response);
      this.feeds = Array.from(response);
      this.feedsForCountry = Array.from(response);
      this.feedsForRole = Array.from(response);
      this.feedsForSearch = Array.from(response);

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

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
