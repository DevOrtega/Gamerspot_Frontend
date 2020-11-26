import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApexstatisticsService {
  private apexurl:string = `${environment.corsProxy}/${environment.trackerggApiUrl}/apex/standard/profile`;
  public statistics: any;

  constructor() {}

  async getApexStatistics(gameuser: String) {
    const platforms: string[] = ['origin', 'psn', 'xbl'];

    for (let platform of platforms) {
      await this.checkApexPlatform(gameuser, platform);
      if (this.statistics && !this.statistics.errors) break;
    }

    return this.statistics;
  }

  async checkApexPlatform(gameuser: String, platform: String) {
    const key = environment.trackerAPIKey;
    return axios.get(`${this.apexurl}/${platform}/${gameuser}`, {
      headers: {
        "TRN-Api-Key": key
      },
      withCredentials: false
    })
    .then(response => {;
      this.statistics = response.data;
    })
    .catch(() =>  null)
  }
}
