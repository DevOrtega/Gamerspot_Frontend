import { Component, Input, OnInit } from '@angular/core';
import { ApexstatisticsService } from 'src/app/services/apexstatistics/apexstatistics.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-profile-statistics-apex',
  templateUrl: './profile-statistics-apex.component.html',
  styleUrls: ['./profile-statistics-apex.component.css']
})
export class ProfileStatisticsApexComponent implements OnInit {
  gameData: { gameName: string, gameUser: string }[];
  statistics: any;

  constructor(private userService: UsersService, private apexstatistics: ApexstatisticsService) {
    this.userService.profile.subscribe(x => this.gameData = x.games);
  }

  async ngOnInit(): Promise<void> {
    let gameUser = this.gameData.filter(game => game.gameName.toLocaleLowerCase() === 'apex')[0].gameUser;
    this.statistics = await this.apexstatistics.getApexStatistics(gameUser);
  }
}
