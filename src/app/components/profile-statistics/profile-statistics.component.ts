import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    'apex': 'Apex'
  };

  gamesRoutes = {
    'apex': './apex'
  }
  
  constructor(private router: Router, private userService: UsersService) {
    this.userService.profile.subscribe(x => this.originalGames = x.gameList);
  }

  ngOnInit(): void {
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


  setActive(buttonName: string): void {
    this.activeButton = buttonName;
  }

  isActive(buttonName: string): boolean {
    return this.activeButton === buttonName;
  }
}
