import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users/users.service';
import { DatePipe } from '@angular/common';
import { Userprofiledata } from 'src/app/interfaces/userprofiledata';
import { Userprofileform } from 'src/app/interfaces/userprofileform';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  public userData:User = {
    name: '',
    username: '',
    role: ''
  };
  public userProfileData:Userprofiledata = {
    country: '',
    bornDate: '',
    gameList: [],
    linkList: [],
    biography: ''
  };
  public userProfileForm:Userprofileform = {
    country: '',
    bornDate: new Date(),
    gameList: [],
    linkList: [],
    biography: ''
  };

  public editing:boolean = false;
  public showSelect:boolean = false;

  private token;

  constructor(
    private userService: UsersService,
    private router:Router,
    private cookieService: CookieService,
    private datePipe:DatePipe
    ) { }

  async ngOnInit(): Promise<void> {
    this.token = await this.userService.getDecodeAccessToken();
    this.getProfile(this.token);
  }



  async getProfile(token) {
    const user = await this.userService.getUserByUsername(token.user.username);    if (user != undefined) {
      this.userData = {
        name: user.name,
        username: user.username,
        role: user.role
      };

      const dateWithoutZ = user.bornDate.toString().substring(0, user.bornDate.toString().length - 1);
      const dateFormated = this.datePipe.transform(dateWithoutZ,"dd/MM/yyyy");

      this.userProfileForm = {
        country: user.country,
        bornDate: user.bornDate,
        gameList: user.gameList,
        linkList: user.linkList,
        biography: user.biography
      };

      this.userProfileData = {
        country: user.country,
        bornDate: dateFormated,
        gameList: user.gameList,
        linkList: user.linkList,
        biography: user.biography
      };
    }

  }

  async editProfile(event) {
    this.editing = !this.editing;
    await this.userService.editUserProfile(this.userData.username, event);
    this.getProfile(this.token);
  }

  showEditForm() {
    this.editing = !this.editing;
  }

  logout() {
    this.userService.revokeToken();
    localStorage.clear();
    this.router.navigateByUrl('login');
    this.cookieService.deleteAll();
  }

}
