import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApexStatisticsService } from 'src/app/services/apexstatistics/apex-statistics.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';

import { Game } from '../../interfaces/game';

@Component({
  selector: 'app-profile-statistics-apex',
  templateUrl: './profile-statistics-apex.component.html',
  styleUrls: ['./profile-statistics-apex.component.css']
})
export class ProfileStatisticsApexComponent implements OnInit, OnDestroy {
  private usernameParam: string;
  private games: Game[];
  public statistics: any;
  public loading: boolean = false;

  private getParamsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UsersService,
    private apexStats: ApexStatisticsService
  ) {

  }

  ngOnInit(): void {
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

      let gameUser = this.games.filter(game => game.gameName.toLocaleLowerCase() === 'apex')[0].gameUser;

      if (
        this.apexStats.gameuser
        &&
        this.apexStats.gameuser === gameUser
      ) {
        this.statistics = this.apexStats.statistics;
      } else {
        this.loading = true;
        this.statistics = await this.apexStats.getApexStatistics(gameUser);

        if (this.statistics) {
          if (!this.statistics.data.segments[0].stats.matchesPlayed) {
            this.statistics.data.segments[0].stats.matchesPlayed = { displayValue: 'N/A' };
          }

          if (!this.statistics.data.segments[0].stats.rankScore.rank) {
            this.statistics.data.segments[0].stats.rankScore.rank = 'N/A';
          } else {
            this.statistics.data.segments[0].stats.rankScore.rank = '#' + this.statistics.data.segments[0].stats.rankScore.rank;
          }

          if (!this.statistics.data.segments[0].stats.killsPerMatch) {
            this.statistics.data.segments[0].stats.killsPerMatch = { displayValue: 'N/A' };
          }

          if (!this.statistics.data.segments[0].stats.damage) {
            this.statistics.data.segments[0].stats.damage = { displayValue: 'N/A' };
          }
        }

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
