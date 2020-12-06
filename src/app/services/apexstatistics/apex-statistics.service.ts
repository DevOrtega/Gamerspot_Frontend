import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApexStatisticsService {
  private apexurl: string = `${environment.corsProxy}/${environment.trackerggApiUrl}/apex/standard/profile`;
  private trackerKey: string = environment.trackerAPIKey;

  public gameuser: string;
  public statistics: any;

  constructor() {}

  async getApexStatistics(gameuser: string): Promise<any> {
    const platforms: string[] = ['origin', 'psn', 'xbl'];

    for (let platform of platforms) {
      await this.checkApexPlatform(gameuser, platform);
      if (this.statistics) break;
    }

    this.gameuser = gameuser;

    return this.statistics;
  }

  async checkApexPlatform(gameuser: string, platform: string): Promise<any> {
    return axios.get(`${this.apexurl}/${platform}/${gameuser}`, {
      headers: {
        "TRN-Api-Key": this.trackerKey
      },
      withCredentials: false
    })
    .then(response => {
      this.statistics = response.data;
    })
    .catch(() =>  this.statistics = undefined)
  }
}
