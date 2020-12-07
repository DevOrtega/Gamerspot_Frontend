import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LolStatisticsService } from 'src/app/services/lolstatistics/lol-statistics.service';
import { UsersService } from 'src/app/services/users/users.service';

import { Game } from '../../interfaces/game';

@Component({
  selector: 'app-profile-statistics-lol',
  templateUrl: './profile-statistics-lol.component.html',
  styleUrls: ['./profile-statistics-lol.component.css']
})
export class ProfileStatisticsLolComponent implements OnInit, OnDestroy {
  private usernameParam: string;
  private games: Game[];
  public statistics: any;
  public loading: boolean = false;

  private getParamsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UsersService,
    private lolStatsService: LolStatisticsService
  ) {

  }

  ngOnInit(): void  {
    this.getParamsSubscription = this.route.parent.parent.params.subscribe(async params => {
      this.usernameParam = params['username'];

      let username: string = null;

      if (
        this.userService.profileData
        &&
        !this.authService.itsMe(this.usernameParam)
      ) {
        username = this.userService.profileData.username;
        this.games = this.userService.profileData.games;
      } else {
        username = this.authService.userData.username;
        this.games = this.authService.userData.games;
      }

      let gameUser = this.games.filter(game => game.gameName.toLocaleLowerCase() === 'lol')[0].gameUser;

      if (
        this.lolStatsService.gameuser
        &&
        this.lolStatsService.gameuser === gameUser
      ) {
        this.statistics = this.lolStatsService.statistics;
      } else {
        this.loading = true;
        this.statistics = await this.lolStatsService.getLolProfile(gameUser);
        this.loading = false;
      }      
    })
  }

  ngOnDestroy(): void {
    if (this.getParamsSubscription) {
      this.getParamsSubscription.unsubscribe();
    }
  }
}
