import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-profile-statistics-main',
  templateUrl: './profile-statistics-main.component.html',
  styleUrls: ['./profile-statistics-main.component.css']
})
export class ProfileStatisticsMainComponent implements OnInit {
  games: { gameName: string, gameUser: string }[];

  constructor(private userService: UsersService) {
    this.userService.profile.subscribe(x => this.games = x.games);
  }

  ngOnInit(): void {

  }

  existGames(): boolean {
    if (this.games && this.games.length > 0) return true;
   
    return false;
  }
}
