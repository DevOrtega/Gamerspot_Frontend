import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LolStatisticsService {
  private riotKey: string = environment.riotAPIKey;

  public gameuser: string;
  public statistics: any;

  constructor() { }

  async getLolProfile(gameuser: string): Promise<any> {
    const servers: string[] = ['euw1', 'eun1', 'br1', 'jp1', 'kr', 'la1', 'la2', 'na1', 'oc1', 'tr1', 'ru'];

    for (let server of servers) {
      await this.checkLolServer(gameuser, server);
      if (this.statistics) break;
    }

    this.gameuser = gameuser;

    return this.statistics;
  }

  async checkLolServer(gameuser: string, server: string): Promise<any> {
    return axios.get(`${environment.corsProxy}/https://${server}${environment.riotApiUrl}${environment.summonerUrl}${gameuser}`, {
      headers: {
        "X-Riot-Token": this.riotKey
      },
      withCredentials: false
    })
      .then(async response => {
        await this.getLolStats(response.data, server);
      })
      .catch(() => this.statistics = undefined)
  }

  async getLolStats(profile_response, server): Promise<any> {
    return axios.get(`${environment.corsProxy}/https://${server}${environment.riotApiUrl}${environment.lolStatsUrl}${profile_response.id}`, {
      headers: {
        "X-Riot-Token": this.riotKey
      },
      withCredentials: false
    })
    .then(response => {
      this.statistics = response.data;

      if (this.statistics[0].queueType == 'RANKED_FLEX_SR') {
        this.statistics[0].tier = this.statistics[1].tier;
        this.statistics[0].rank = this.statistics[1].rank;
        this.statistics[0].wins = this.statistics[1].wins;
        this.statistics[0].losses = this.statistics[1].losses;
        this.statistics[0].leaguePoints = this.statistics[1].leaguePoints;
      }

      // Show the level in the view
      this.statistics[0].summonerLevel = profile_response.summonerLevel;

      // All Tier letters to lowercase except the first one, to compare them with the images in the view
      this.statistics[0].tier = this.statistics[0].tier.charAt(0) + this.statistics[0].tier.substring(1).toLowerCase();

      // Check if the server name has a number in it and removes it and then convert it to uppercase to show it in the view
      let hasNumber = /\d/;
      if (hasNumber.test(server)) {
        let serverWithNoDigits = server.replace(/[0-9]/g, '');
        server = serverWithNoDigits.toUpperCase()
      } else {
        server = server.toUpperCase()
      }

      this.statistics[0].server = server;
    })
    .catch(() => null)
  }
}
