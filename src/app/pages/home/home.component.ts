import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/services/countries/countries.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PostsService } from 'src/app/services/posts/posts.service';
import { Post } from 'src/app/interfaces/post';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public posts: Post[];
  public countries: string[];
  private postsToFilter: Post[];
  private postsForCountry: Post[];
  private postsForRole: Post[];
  private postsForSearch: Post[];
  

  public getCountriesSubscription: Subscription;

  public error: any;
  public loading: boolean;

  public submitted: boolean = false;
  public roles: string[] = ['Gamer', 'Team', 'Sponsor'];
  public searched: string = '';
  public countrySelected: string = 'All countries';
  public roleSelected: string = 'All roles';
  public errorSearch: boolean = false;

  constructor(
    private authService: AuthService,
    private postService: PostsService,
    private countryService: CountriesService,
    ) {
  }

  ngOnInit() {
    this.showPosts();
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

  filterPosts(): void {
    this.errorSearch = false;

    if (this.countrySelected != 'All countries') {
      this.postsForCountry = this.postsToFilter.filter(post => post.owner.country === this.countrySelected);
    } else {
      this.postsForCountry = Array.from(this.postsToFilter);
    }

    let intersect = this.postsForRole.filter(value => this.postsForSearch.includes(value))
    this.posts = this.postsForCountry.filter(value => intersect.includes(value))


    if (this.posts.length === 0) {
      this.errorSearch = true;
    } else {
      this.errorSearch = false;
    }

    this.nextFilter();
  }

  nextFilter(): void {
    if (this.roleSelected === 'Gamer') {
      this.postsForRole = this.postsToFilter.filter(post => post.owner.gamer);
    } else if (this.roleSelected === 'Team') {
      this.postsForRole = this.postsToFilter.filter(post => post.owner.team);
    } else if (this.roleSelected === 'Sponsor') {
      this.postsForRole = this.postsToFilter.filter(post => post.owner.sponsor);
    } else {
      this.postsForRole = Array.from(this.postsToFilter);
    }

    let intersect = this.postsForCountry.filter(value => this.postsForSearch.includes(value));
    this.posts = this.postsForRole.filter(value => intersect.includes(value));

    if (this.posts.length === 0) {
      this.errorSearch = true;
    } else {
      this.errorSearch = false;

      this.posts.sort( (a,b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });
    }
  }

  search(): Post[] {
    this.errorSearch = false;

    if (this.searched === '') {
      this.postsForSearch = Array.from(this.postsToFilter);
    }
    else {
      this.postsForSearch = this.postsToFilter.filter(post => {
        if (post.owner.gamer) {
          return post.owner.username.toLocaleLowerCase().startsWith(this.searched.toLocaleLowerCase())
          || post.owner.gamer.name.toLocaleLowerCase().startsWith(this.searched.toLocaleLowerCase());
        }

        if (post.owner.team) {
          return post.owner.username.toLocaleLowerCase().startsWith(this.searched.toLocaleLowerCase())
          || post.owner.team.name.toLocaleLowerCase().startsWith(this.searched.toLocaleLowerCase());
        }

        if (post.owner.sponsor) {
          return post.owner.username.toLocaleLowerCase().startsWith(this.searched.toLocaleLowerCase())
          || post.owner.sponsor.name.toLocaleLowerCase().startsWith(this.searched.toLocaleLowerCase());
        }
      })
    }

    let intersect = this.postsForCountry.filter(value => this.postsForRole.includes(value));
    this.posts = this.postsForSearch.filter(value => intersect.includes(value));


    if (this.posts.length === 0) {
      this.errorSearch = true;
    } else {
      this.errorSearch = false;

      this.posts.sort( (a,b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });
    }

    return this.posts;
  }

  savePost(event: any): void {
    this.postService.createPost(event).subscribe(() => {
      this.showPosts();
    });
  }

  showPosts(): void {
    this.postService.getPosts().subscribe(response => {
      this.postsToFilter = Array.from(response);
      this.posts = Array.from(response);
      this.postsForCountry = Array.from(response);
      this.postsForRole = Array.from(response);
      this.postsForSearch = Array.from(response);

      this.posts.sort( (a,b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });

      return this.posts;
    });
  }

  deletePost(post: Post): void {
    this.posts = this.posts.filter(f => {
      return f._id != post._id
    });
    this.postService.deletePost(post)
    .subscribe(response => {
      return response;
    })
  }

  public isLoggedIn = (() => this.authService.isLoggedIn())

  ngOnDestroy(): void {
    if (this.getCountriesSubscription) {
      this.getCountriesSubscription.unsubscribe();
    }
  }
}
