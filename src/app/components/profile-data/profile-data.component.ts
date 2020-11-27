import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.css']
})
export class ProfileDataComponent implements OnInit {
  @Input() userProfileData: User;
  public bornDateFormatted: string;
  public activeButton: string;


  constructor(private userService: UsersService) {
    this.activeButton = 'btn1';
  }

  ngOnInit(): void {
    if (this.userProfileData.gamer && this.userProfileData.gamer.bornDate) {
      this.bornDateFormatted = this.userService.formatDateToDDMMYYYY(this.userProfileData.gamer.bornDate)
    }
  }

  setActive(buttonName: string): void {
    this.activeButton = buttonName;
  }

  isActive(buttonName: string): boolean {
    return this.activeButton === buttonName;
  }

  existGames(): boolean {
    if (this.userProfileData.games && this.userProfileData.games.length > 0) {
      return true;
    }

    return false;
  }

  existLinks(): boolean {
    if (this.userProfileData.links && this.userProfileData.links.length > 0) {
      return true;
    }

    return false;
  }

  isTeam(): boolean {
    return this.userService.isTeam(this.userProfileData);
  }
}
