import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class TftStatisticsService {
  public statistics: any;
  private key= environment.lolAPIKey;

  constructor() { }

  async getTftProfile(gameuser: String) {
    const servers: string[] = ['BR1', 'EUN1', 'EUW1', 'JP1', 'KR', 'LA1', 'LA2', 'NA1', 'OC1', 'TR1', 'RU'];

    for (let server of servers) {
      await this.checkLolServer(gameuser, server);
      if (this.statistics && !this.statistics.errors) break;
    }

    return this.statistics;
  }

  async checkLolServer(gameuser: String, server: String) {
    return axios.get(`${environment.corsProxy}/https://${server}${environment.lolApiUrl}${environment.tftUrl}${gameuser}`, {
      headers: {
        "X-Riot-Token": this.key
      },
      withCredentials: false
    })
    .then(response => {
      this.getTftStats(response.data, server);
    })
    .catch(() =>  null)
  }

  async getTftStats(profile_response, server) {
    return axios.get(`${environment.corsProxy}/https://${server}${environment.lolApiUrl}${environment.tftStatsUrl}${profile_response.id}`, {
      headers: {
        "X-Riot-Token": this.key
      },
      withCredentials: false
    })
    .then(response => {
      console.log(response);

      this.statistics = response.data;
      // para mostrar el nivel en la vista
      this.statistics[0].summonerLevel=profile_response.summonerLevel;
      // comprueba si el servidor tiene número y se lo quita, para después mostrarlo en vista
      let hasNumber = /\d/;
      if (hasNumber.test(server)) {
        let serverWithNoDigits = server.replace(/[0-9]/g, '');
        server = serverWithNoDigits
      }
      this.statistics[0].server= server;
      // Se pasa a minúsculas todas las letras del Tier menos la primera, para poder comparar con las imágenes en vista
      this.statistics[0].tier= this.statistics[0].tier.charAt(0) + this.statistics[0].tier.substring(1).toLowerCase();
    })
    .catch(() =>  null)
  }
}
