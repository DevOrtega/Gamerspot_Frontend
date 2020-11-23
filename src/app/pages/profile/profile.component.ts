import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { DatePipe } from '@angular/common';
import { Userprofiledata } from 'src/app/interfaces/userprofiledata';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private getParamsSubscriptor: Subscription;
  private getUserSubscriptor: Subscription;
  username: string;
  loading = false;
  error = '';

  activeButton: string = 'btn1'

  public userProfileData : Userprofiledata = {
    username: '',
    email: '',
    gamer: {},
    team: {},
    sponsor: {},
    name: '',
    country: '',
    bornDate: '',
    games: [],
    links: [],
    biography: '',
    posts: [],
    createdAt: ''
  };

  public editing:boolean = false;
  public showSelect:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UsersService,
    private datePipe: DatePipe,
  ) {}

  async ngOnInit(): Promise<void> {
    this.getParamsSubscriptor = this.route.params.subscribe(params => {
      this.username = params['username'];

      this.loading = true;
      this.getUserSubscriptor = this.userService.getUserByUsername(params['username'])
      .pipe(first())
      .subscribe({
        next: user => {
          this.getProfileData(user);
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      })
    });
  }

  getProfileData(user: Userprofiledata) {
    let bornDateFormated: string;

    if (user.bornDate != undefined) {
      const bornDateWithoutZ = user.bornDate.toString().substring(0, user.bornDate.toString().length - 1);
      bornDateFormated = this.datePipe.transform(bornDateWithoutZ,"dd/MM/yyyy");
    }

    let createdAtFormated: string;

    if (user.createdAt != undefined) {
      const createdAtWithoutZ = user.createdAt.toString().substring(0, user.createdAt.toString().length - 1);
      createdAtFormated = this.datePipe.transform(createdAtWithoutZ,"dd/MM/yyyy");
    }

    this.userProfileData = {
      username: user.username,
      email: user.email,
      gamer: user.gamer,
      team: user.team,
      sponsor: user.sponsor,
      name: user.name,
      country: user.country,
      bornDate: bornDateFormated,
      games: user.games,
      links: user.links,
      biography: user.biography,
      posts: user.posts,
      createdAt: createdAtFormated
    };
  }

  existPhoto(): boolean {
    if (this.userProfileData.photoUrl) {
      return true;
    }

    return false;
  }

  public isGamer(): boolean {
    if (this.userProfileData.gamer && Object.entries(this.userProfileData.gamer).length > 0) {
      return true;
    }

    return false;
  }

  public isTeam(): boolean {
    if (this.userProfileData.team && Object.entries(this.userProfileData.team).length > 0) {
      return true;
    }

    return false;
  }

  public isSponsor(): boolean {
    if (this.userProfileData.sponsor && Object.entries(this.userProfileData.sponsor).length > 0) {
      return true;
    }

    return false;
  }

  public itsMe(): boolean {
    if (this.authService.userData.username === this.username) {
      return true;
    }

    return false;
  }

  setActive(buttonName: string): void {
    this.activeButton = buttonName;
  }

  isActive(buttonName: string): boolean {
    return this.activeButton === buttonName;
  }

  ngOnDestroy() {
    if (this.getUserSubscriptor) {
      this.getUserSubscriptor.unsubscribe();
    }
    if (this.getParamsSubscriptor) {
      this.getParamsSubscriptor.unsubscribe();
    }
  }
}
