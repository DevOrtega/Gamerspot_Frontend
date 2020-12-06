import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';

import { Game } from '../../interfaces/game';

interface GameRoute {
  gameName: string,
  gameUser: string,
  gameRoute: string
}

@Component({
  selector: 'app-profile-statistics',
  templateUrl: './profile-statistics.component.html',
  styleUrls: ['./profile-statistics.component.css']
})
export class ProfileStatisticsComponent implements OnInit, OnDestroy {
  private usernameParam: string;
  private originalGames: Game[];
  games: GameRoute[];

  gamesNames = {
    'apex': 'Apex',
    'lol' : 'LoL',
    'tft' : 'TFT',
  };

  gamesRoutes = {
    'apex': './apex',
    'lol' : './lol',
    'tft' : './tft'
  }

  private getParamsSubscription: Subscription;

  activeButton: string;

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private route: ActivatedRoute
    ) {

  }

  ngOnInit(): void {
    this.getParamsSubscription = this.route.parent.params.subscribe(params => {
      this.usernameParam = params['username'];

      if (
        this.userService.profileData
        &&
        !this.authService.itsMe(this.usernameParam)
      ) {
        this.originalGames = this.userService.profileData.games;
      } else {
        this.originalGames = this.authService.userData.games;
      }
 
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
    })
  }

  public setActive(buttonName: string): void {
    this.activeButton = buttonName;
  }

  public isActive(buttonName: string): boolean {
    return this.activeButton === buttonName;
  }

  ngOnDestroy(): void {
    if (this.getParamsSubscription) {
      this.getParamsSubscription.unsubscribe();
    }
  }
}
