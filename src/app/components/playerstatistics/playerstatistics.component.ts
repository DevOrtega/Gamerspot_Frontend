import { Component, Input, OnInit } from '@angular/core';
import { ApexstatisticsService } from 'src/app/services/playerstatistics/apexstatistics.service';

@Component({
  selector: 'app-playerstatistics',
  templateUrl: './playerstatistics.component.html',
  styleUrls: ['./playerstatistics.component.css']
})
export class PlayerstatisticsComponent implements OnInit {
  @Input() gameData;
  statistics:any;

  constructor(private apexstatistics: ApexstatisticsService) {}

  async ngOnInit(): Promise<void> {
    this.statistics = await this.getStatistics();
  }

  getStatistics(): any {
    if (this.gameData.gameName.toLocaleLowerCase() === 'apex') {
      return this.apexstatistics.getPlayerStatistics(this.gameData.gameUser);
    }
  }

}
