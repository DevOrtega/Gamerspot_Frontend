import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LolStatisticsService {
  public statistics: any;

  constructor() { }

  async getLolProfile(gameuser: String) {
    const servers: string[] = ['br1', 'eun1', 'euw1', 'jp1', 'kr', 'la1', 'la2', 'na1', 'oc1', 'tr1', 'ru'];

    for (let server of servers) {
      await this.checkLolServer(gameuser, server);
      if (this.statistics && !this.statistics.errors) break;
    }

    return this.statistics;
  }

  async checkLolServer(gameuser: String, server: String) {
    return axios.get(`${environment.corsProxy}/https://${server}${environment.lolApiUrl}${environment.summonerUrl}${gameuser}`, {
      headers: {
        "X-Riot-Token": "RGAPI-c154f37e-d58a-418a-b53d-e48b87e28fa7"
      },
      withCredentials: false
    })
    .then(response => {
      this.getLolStats(response.data, server);
    })
    .catch(() =>  null)
  }

  async getLolStats(profile_response, server) {
    return axios.get(`${environment.corsProxy}/https://${server}${environment.lolApiUrl}${environment.lolStatsUrl}${profile_response.id}`, {
      headers: {
        "X-Riot-Token": "RGAPI-c154f37e-d58a-418a-b53d-e48b87e28fa7"
      },
      withCredentials: false
    })
    .then(response => {
      this.statistics = response.data;
      this.statistics[0].summonerLevel=profile_response.summonerLevel;
      let hasNumber = /\d/;
      if (hasNumber.test(server)) {
        let serverWithNoDigits = server.replace(/[0-9]/g, '');
        server = serverWithNoDigits.toUpperCase()
      } else {
        server = server.toUpperCase()
      }
      this.statistics[0].server= server;
      this.statistics[0].tier= this.statistics[0].tier.charAt(0) + this.statistics[0].tier.substring(1).toLowerCase();
      this.statistics[1].tier= this.statistics[1].tier.charAt(0) + this.statistics[1].tier.substring(1).toLowerCase();
    })
    .catch(() =>  null)
  }
}
