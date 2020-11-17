import { Component, Input, OnInit } from '@angular/core';
import { ApexstatisticsService } from 'src/app/services/playerstatistics/apexstatistics.service';

@Component({
  selector: 'app-playerstatistics',
  templateUrl: './playerstatistics.component.html',
  styleUrls: ['./playerstatistics.component.css']
})
export class PlayerstatisticsComponent implements OnInit {

  @Input() gameData;

  gameName: string;
  gameUser: string;
  statistics:any;

  constructor(private apexstatistics: ApexstatisticsService) {}

  ngOnInit(): void {
    this.gameName = this.gameData.gameName;
    this.gameUser = this.gameData.gameUser;
    this.statistics = this.getStatistics();
  }

  getStatistics(): any {
    console.log(this.gameName);
    if (this.gameName.toLocaleLowerCase() === 'apex') {
      return this.apexstatistics.getPlayerStatistics(this.gameUser);
    }
  }

}
