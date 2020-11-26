import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TftStatisticsService } from 'src/app/services/tftstatistics/tft-statistics.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-tft-statistics',
  templateUrl: './tft-statistics.component.html',
  styleUrls: ['./tft-stats.component.css']
})
export class TftStatisticsComponent implements OnInit {
  gameData: { gameName: string, gameUser: string }[];
  statistics: any;

  constructor(private userService:UsersService, private tftService: TftStatisticsService,private authService: AuthService) { }

  async ngOnInit(): Promise<void> {
    this.gameData = this.authService.userData.games;

    let gameUser = this.gameData.filter(game => game.gameName.toLocaleLowerCase() === 'tft')[0].gameUser;
    this.statistics= await this.tftService.getTftProfile(gameUser);
  }

}
