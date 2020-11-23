import { Component, OnInit } from '@angular/core';
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

  constructor(private userService:UsersService,private lolstats: LolStatisticsService) {
    this.userService.profile.subscribe(x => this.gameData = x.games);
  }

  async ngOnInit(): Promise<void>  {
    let gameUser = this.gameData.filter(game => game.gameName.toLocaleLowerCase() === 'lol')[0].gameUser;
   this.statistics = await this.lolstats.getLolProfile(gameUser);
  }

}
