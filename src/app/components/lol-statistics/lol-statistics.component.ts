import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LolStatisticsService } from 'src/app/services/lolstatistics/lol-statistics.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-lol-statistics',
  templateUrl: './lol-statistics.component.html',
  styleUrls: ['./lol-statistics.component.css']
})
export class LolStatisticsComponent implements OnInit {
  gameData: { gameName: string, gameUser: string }[];
  statistics: any;

  constructor(private userService:UsersService,private lolstats: LolStatisticsService,private authService: AuthService,) {
   // this.userService.profile.subscribe(x => this.gameData = x.games);
  }

  async ngOnInit(): Promise<void>  {
    this.gameData = this.authService.userData.games;

    let gameUser = this.gameData.filter(game => game.gameName.toLocaleLowerCase() === 'lol')[0].gameUser;
   this.statistics = await this.lolstats.getLolProfile(gameUser);
  }

}
