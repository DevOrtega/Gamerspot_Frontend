import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-profile-statistics',
  templateUrl: './profile-statistics.component.html',
  styleUrls: ['./profile-statistics.component.css']
})
export class ProfileStatisticsComponent implements OnInit {
  originalGames: { gameName: string, gameUser: string }[];
  activeButton: string;
  games: { gameName: string, gameUser: string, gameRoute: string }[];

  gamesNames = {
    'apex': 'Apex',
    'lol' : 'LoL'
  };

  gamesRoutes = {
    'apex': './apex',
    'lol' : './lol'
  }

  constructor(
    private authService: AuthService,
    ) {

  }

  ngOnInit(): void {
    this.originalGames = this.authService.userData.games;

    this.games = this.originalGames.map(game => {
      let gameName: any, gameRoute: any;

      if (this.gamesNames[game['gameName']]) {
        gameName = this.gamesNames[game['gameName']];
        gameRoute = this.gamesRoutes[game['gameName']];
      } else {
        gameName = game['gameName'];
        gameRoute = './nodata';
      }

      return {
        gameName: gameName,
        gameUser: game['gameUser'],
        gameRoute: gameRoute
      };
    })
  }

  existGames(): boolean {
    if (this.games && this.games.length > 0) return true;

    return false;
  }

  setActive(buttonName: string): void {
    this.activeButton = buttonName;
  }

  isActive(buttonName: string): boolean {
    return this.activeButton === buttonName;
  }
}
