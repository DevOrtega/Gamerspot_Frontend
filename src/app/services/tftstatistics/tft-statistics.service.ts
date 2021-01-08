import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class TftStatisticsService {
  private riotKey = environment.riotTFTAPIKey;

  public gameuser: string;
  public statistics: any;

  constructor() { }

  async getTftProfile(gameuser: string): Promise<any> {
    const servers: string[] = ['EUW1', 'EUN1', 'BR1', 'JP1', 'KR', 'LA1', 'LA2', 'NA1', 'OC1', 'TR1', 'RU'];

    for (let server of servers) {
      await this.checkLolServer(gameuser, server);
      if (this.statistics) break;
    }

    this.gameuser = gameuser;

    return this.statistics;
  }

  async checkLolServer(gameuser: string, server: string): Promise<any> {
    return axios.get(`${environment.corsProxy}/https://${server}${environment.riotApiUrl}${environment.tftUrl}${gameuser}`, {
      headers: {
        "X-Riot-Token": this.riotKey
      },
      withCredentials: false
    })
    .then(async response => {
      await this.getTftStats(response.data, server);
    })
    .catch(() => this.statistics = undefined)
  }

  async getTftStats(profile_response, server): Promise<any> {
    return axios.get(`${environment.corsProxy}/https://${server}${environment.riotApiUrl}${environment.tftStatsUrl}${profile_response.id}`, {
      headers: {
        "X-Riot-Token": this.riotKey
      },
      withCredentials: false
    })
    .then(response => {
      this.statistics = response.data;

      // Show the level in the view
      this.statistics[0].summonerLevel=profile_response.summonerLevel;

      // All Tier letters to lowercase except the first one, to compare them with the images in the view
      this.statistics[0].tier= this.statistics[0].tier.charAt(0) + this.statistics[0].tier.substring(1).toLowerCase();

      // Check if the server name has a number in it and removes it and then convert it to uppercase to show it in the view
      let hasNumber = /\d/;
      if (hasNumber.test(server)) {
        let serverWithNoDigits = server.replace(/[0-9]/g, '');
        server = serverWithNoDigits
      } else {
        server = server.toUpperCase()
      }

      this.statistics[0].server = server;
    })
    .catch(() => null)
  }
}
