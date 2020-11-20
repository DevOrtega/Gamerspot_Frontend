import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users/users.service';
import { DatePipe } from '@angular/common';
import { Userprofiledata } from 'src/app/interfaces/userprofiledata';
import { Userprofileform } from 'src/app/interfaces/userprofileform';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private sub: any;
  username: string;
  loading = false;
  error = '';

  public userProfileData : Userprofiledata = {
    username: '',
    role: '',
    email: '',
    name: '',
    country: '',
    bornDate: '',
    gameList: [],
    linkList: [],
    biography: ''
  };

  public userProfileForm : Userprofileform = {
    email: '',
    name: '',
    country: '',
    bornDate: new Date(),
    gameList: [],
    linkList: [],
    biography: ''
  };

  public editing:boolean = false;
  public showSelect:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private datePipe: DatePipe,
  ) {}

  async ngOnInit(): Promise<void> {
    this.sub = this.route.params.subscribe(params => {
      this.username = params['username'];

      this.loading = true;
      this.userService.getUserByUsername(params['username'])
      .pipe(first())
      .subscribe({
        next: user => {
          this.getProfileData(user);
          this.getProfileForm(user);
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      })
    });
  }

  getProfileData(user: Userprofiledata) {
    let dateFormated:string;
    
    if (user.bornDate != undefined) {
      const dateWithoutZ = user.bornDate.toString().substring(0, user.bornDate.toString().length - 1);
      dateFormated = this.datePipe.transform(dateWithoutZ,"dd/MM/yyyy");
    }

    this.userProfileData = {
      username: user.username,
      role: user.role,
      email: user.email,
      name: user.name,
      country: user.country,
      bornDate: dateFormated,
      gameList: user.gameList,
      linkList: user.linkList,
      biography: user.biography
    };
  }

  getProfileForm(user: Userprofileform) {
    this.userProfileForm = {
      email: user.email,
      name: user.name,
      country: user.country,
      bornDate: user.bornDate,
      gameList: user.gameList,
      linkList: user.linkList,
      biography: user.biography
    };
  }

  /*
  async editProfile(event: any) {
    this.editing = !this.editing;
    await this.userService.editUserProfile(this.userData.username, event);
    this.getProfile();
  }

  showEditForm() {
    this.editing = !this.editing;
  }
  */

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
