import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Team } from 'src/app/interfaces/team';
import {Teamprofiledata } from 'src/app/interfaces/teamprofiledata';
import { environment } from 'src/environments/environment';
import { Gamerprofiledata } from 'src/app/interfaces/gamerprofiledata';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private profileSubject: BehaviorSubject<Teamprofiledata>;
  public profile: Observable<Teamprofiledata>;

  constructor(private http: HttpClient,) {
    this.profileSubject = new BehaviorSubject<Teamprofiledata>(null);
    this.profile = this.profileSubject.asObservable();
  }

  public get profileData(): Teamprofiledata {
    return this.profileSubject.value;
  }

  public getTeams(player?:any, sponsor?:any) {
    if (player) {
      return this.http.get<any>(`${environment.apiUrl}/teams?players=${player}`, { withCredentials: true })
      .pipe(map(teams => {
        this.profileSubject.next(teams);
        return teams;
      }));
    }
    if (sponsor) {
      return this.http.get<any>(`${environment.apiUrl}/teams?sponsors=${sponsor}`, { withCredentials: true })
      .pipe(map(teams => {
        this.profileSubject.next(teams);
        return teams;
      }));
    }

    return this.http.get<any>(`${environment.apiUrl}/teams`)
      .pipe(map(teams => {
        this.profileSubject.next(teams);

        return teams;
      }))
  }

  public getTeamById(id: string) {
    return this.http.get<any>(`${environment.apiUrl}/teams/${id}`, { withCredentials: true })
      .pipe(map((team: Teamprofiledata) => {
        this.profileSubject.next(team);

        return team;
      }))
  }

  public registerTeam(teamdata: Team) {
    return this.http.post<any>(`${environment.apiUrl}/teams/register`, teamdata);
  }

  public editTeam(id: string, team_data: Teamprofiledata) {
    return this.http.patch(`${environment.apiUrl}/teams/${id}`, team_data, { withCredentials: true })
      .pipe(map((team: Teamprofiledata) => {
        this.profileSubject.next(team);

        return team;
      }))
  }

  public addPlayer(id: string, player_id: any) {
    const player_data={
      player_id:player_id
    }
    return axios.patch(`${environment.apiUrl}/teams/${id}/add_player`, player_data, {
      withCredentials: true
    })
    .then(response => {


    })
    .catch(() =>  null)
    /*return this.http.patch(`${environment.apiUrl}/teams/${id}/add_player`, player_id, { withCredentials: true })
      .pipe(map((team: Teamprofiledata) => {


        this.profileSubject.next(team);

        return team;
      }))*/
  }

  public deletePlayer(id: string, player_id: any) {
    const player_data={
      player_id:player_id
    }
    return axios.patch(`${environment.apiUrl}/teams/${id}/delete_player`, player_data, {
      withCredentials: true
    })
    .then(response => {


    })
    .catch(() =>  null)
    /*return this.http.patch(`${environment.apiUrl}/teams/${id}/add_player`, player_id, { withCredentials: true })
      .pipe(map((team: Teamprofiledata) => {


        this.profileSubject.next(team);

        return team;
      }))*/
  }
}
