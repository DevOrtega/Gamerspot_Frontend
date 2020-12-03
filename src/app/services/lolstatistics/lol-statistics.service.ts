import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LolStatisticsService {
  public statistics: any;
  private key = environment.lolAPIKey;
  constructor() { }

  async getLolProfile(gameuser: String) {
    const servers: string[] = ['euw1', 'eun1', 'br1', 'jp1', 'kr', 'la1', 'la2', 'na1', 'oc1', 'tr1', 'ru'];

    for (let server of servers) {
      await this.checkLolServer(gameuser, server);
      if (this.statistics && !this.statistics.errors) break;
    }

    return this.statistics;
  }

  async checkLolServer(gameuser: String, server: String) {
    return axios.get(`${environment.corsProxy}/https://${server}${environment.lolApiUrl}${environment.summonerUrl}${gameuser}`, {
      headers: {
        "X-Riot-Token": this.key
      },
      withCredentials: false
    })
      .then(response => {
        this.getLolStats(response.data, server);
      })
      .catch(() => null)
  }

  async getLolStats(profile_response, server) {
    return axios.get(`${environment.corsProxy}/https://${server}${environment.lolApiUrl}${environment.lolStatsUrl}${profile_response.id}`, {
      headers: {
        "X-Riot-Token": this.key
      },
      withCredentials: false
    })
      .then(response => {
        this.statistics = response.data;
        // para mostrar el nivel en la vista
        if (this.statistics[0].queueType == 'RANKED_FLEX_SR') {
          this.statistics[0].tier = this.statistics[1].tier;
          this.statistics[0].rank = this.statistics[1].rank;
          this.statistics[0].wins = this.statistics[1].wins;
          this.statistics[0].losses = this.statistics[1].losses;
          this.statistics[0].leaguePoints = this.statistics[1].leaguePoints;
        }
        // Se pasa a minúsculas todas las letras del Tier menos la primera, para poder comparar con las imágenes en vista
        this.statistics[0].tier = this.statistics[0].tier.charAt(0) + this.statistics[0].tier.substring(1).toLowerCase();
        this.statistics[0].summonerLevel = profile_response.summonerLevel;
        // comprueba si el servidor tiene número y se lo quita, para después pasarlo a mayúsculas y mostrarlo en vista
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
