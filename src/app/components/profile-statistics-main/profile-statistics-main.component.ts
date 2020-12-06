import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';

import { Game } from '../../interfaces/game';

@Component({
  selector: 'app-profile-statistics-main',
  templateUrl: './profile-statistics-main.component.html',
  styleUrls: ['./profile-statistics-main.component.css']
})
export class ProfileStatisticsMainComponent implements OnInit, OnDestroy {
  private usernameParam: string;
  games: Game[];

  private getParamsSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.getParamsSubscription = this.route.parent.parent.params.subscribe(params => {
      this.usernameParam = params['username'];

      if (
        this.userService.profileData
        &&
        !this.authService.itsMe(this.usernameParam)
      ) {
        this.games = this.userService.profileData.games;
      } else {
        this.games = this.authService.userData.games;
      }
    })
  }

  existGames(): boolean {
    if (this.games && this.games.length > 0) return true;

    return false;
  }

  ngOnDestroy(): void {
    if (this.getParamsSubscription) {
      this.getParamsSubscription.unsubscribe();
    }
  }
}
