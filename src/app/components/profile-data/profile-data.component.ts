import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.css']
})
export class ProfileDataComponent implements OnInit {
  @Input() userProfile;
  activeButton: string = 'btn1';

  constructor() {
  }

  ngOnInit(): void {
  }

  setActive(buttonName: string): void {
    this.activeButton = buttonName;
  }

  isActive(buttonName: string): boolean {
    return this.activeButton === buttonName;
  }

  existGames(): boolean {
    if (this.userProfile.games && this.userProfile.games.length > 0) {
      return true;
    }

    return false;
  }

  existLinks(): boolean {
    if (this.userProfile.links && this.userProfile.links.length > 0) {
      return true;
    }

    return false;
  }
}
