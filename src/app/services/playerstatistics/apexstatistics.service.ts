import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApexstatisticsService {

  private url:string = 'https://public-api.tracker.gg/v2/apex/standard/profile';

  constructor() { }

  getPlayerStatistics(gameuser: String) {
    const platforms: string[] = ['origin', 'psn', 'xbl'];
    let data: any;

    for (let platform of platforms) {
      data = this.checkPlatform(gameuser, platform);
      if (!data.errors) break;
    }

    return data;
  }

  private async checkPlatform(gameuser: String, platform: String) {
    return axios.get(`${this.url}/${platform}/${gameuser}`, {
      headers: {
        "TRN-Api-Key": "cfe19ea4-d2a6-4667-b9bd-da5f473c6baf"
      }
    })
    .then(response => {
      return response.data;
    })
  }
}
