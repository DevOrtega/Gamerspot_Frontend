import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TftStatisticsService } from 'src/app/services/tftstatistics/tft-statistics.service';
import { UsersService } from 'src/app/services/users/users.service';

import { Game } from '../../interfaces/game';

@Component({
  selector: 'app-profile-statistics-tft',
  templateUrl: './profile-statistics-tft.component.html',
  styleUrls: ['./profile-statistics-tft.component.css']
})
export class ProfileStatisticsTftComponent implements OnInit {
  private usernameParam: string;
  private games: Game[];
  public statistics: any;
  public loading: boolean = false;

  private getParamsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UsersService,
    private tftStatsService: TftStatisticsService
  ) {

  }

  async ngOnInit(): Promise<void> {
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

      let gameUser = this.games.filter(game => game.gameName.toLocaleLowerCase() === 'tft')[0].gameUser;
      
      if (
        this.tftStatsService.gameuser
        &&
        this.tftStatsService.gameuser === gameUser
      ) {
        this.statistics = this.tftStatsService.statistics;
      } else {
        this.loading = true;
        this.statistics = await this.tftStatsService.getTftProfile(gameUser);
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
