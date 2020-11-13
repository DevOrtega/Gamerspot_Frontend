import { Component, OnInit } from '@angular/core';
import { Userprofile } from 'src/app/interfaces/userprofile';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UsersService) { }

  ngOnInit(): void {}

  public userProfile:any = {
    role: '',
    links: [],
    country: '',
    born:'',
    bio: '',
    games: [],
  };
  public showSelect:boolean = false;


  async getProfile(username) {
    this.userProfile = await this.userService.getUserByUsername(username);
    return this.userProfile;
  }

  async saveProfile(event) {
    //await this.userService.addUserProfile(event);
    let userProfile:Userprofile = {
      role: event.role.value,
      country: event.country.value,
      bornDate: event.bornDate.value,
      gameList: event.gameList.value,
      linkList: event.linkList.value,
      biography: event.biography.value
    }
    console.log(userProfile);
  }

  editProfile() {
    //Manda un patch
  }

}
