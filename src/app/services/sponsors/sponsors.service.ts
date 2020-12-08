import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sponsor } from 'src/app/interfaces/sponsor';
import { Sponsorprofiledata } from 'src/app/interfaces/sponsorprofiledata';
import { environment } from 'src/environments/environment';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SponsorsService {

  private profileSubject: BehaviorSubject<Sponsorprofiledata>;
  public profile: Observable<Sponsorprofiledata>;

  constructor(private http: HttpClient,) {
    this.profileSubject = new BehaviorSubject<Sponsorprofiledata>(null);
    this.profile = this.profileSubject.asObservable();
   }

   public get profileData(): Sponsorprofiledata {
    return this.profileSubject.value;
  }

  public getSponsors(player?,team?) {
    if (player) {
      return this.http.get<any>(`${environment.apiUrl}/sponsors?player=${player}`, { withCredentials: true })
      .pipe(map(sponsors => {
        this.profileSubject.next(sponsors);
        return sponsors;
      }));
    }

    if (team) {
      return this.http.get<any>(`${environment.apiUrl}/sponsors?team=${team}`, { withCredentials: true })
      .pipe(map(sponsors => {
        this.profileSubject.next(sponsors);
        return sponsors;
      }));
    }
    return this.http.get<any>(`${environment.apiUrl}/sponsors`)
      .pipe(map(sponsors => {
        this.profileSubject.next(sponsors);

        return sponsors;
      }))
  }

  public getSponsorById(id: string) {
    return this.http.get<any>(`${environment.apiUrl}/sponsors/${id}`, { withCredentials: true })
      .pipe(map((sponsor: Sponsorprofiledata) => {
        this.profileSubject.next(sponsor);

        return sponsor;
      }))
  }

  public registerSponsor(sponsordata: Sponsor) {
    return this.http.post<any>(`${environment.apiUrl}/sponsors/register`, sponsordata);
  }

  public editSponsor(id: string, sponsor_data: Sponsorprofiledata) {
    return this.http.patch(`${environment.apiUrl}/sponsors/${id}`, sponsor_data, { withCredentials: true })
      .pipe(map((sponsor: Sponsorprofiledata) => {
        this.profileSubject.next(sponsor);

        return sponsor;
      }))
  }

  public addPlayer(id: string, player_id: any) {
    const player_data={
      player_id:player_id
    }
    return axios.patch(`${environment.apiUrl}/sponsors/${id}/add_player`, player_data, {
      withCredentials: true
    })
    .then(response => {


    })
    .catch(() =>  null)
  }

  public deletePlayer(id: string, player_id: any) {
    const player_data={
      player_id:player_id
    }
    return axios.patch(`${environment.apiUrl}/sponsors/${id}/delete_player`, player_data, {
      withCredentials: true
    })
    .then(response => {


    })
    .catch(() =>  null)
  }

  public addTeam(id: string, team_id: any) {
    const team_data={
      team_id:team_id
    }
    return axios.patch(`${environment.apiUrl}/sponsors/${id}/add_team`, team_data, {
      withCredentials: true
    })
    .then(response => {


    })
    .catch(() =>  null)
  }

  public deleteTeam(id: string, team_id: any) {
    const team_data={
      team_id:team_id
    }
    return axios.patch(`${environment.apiUrl}/sponsors/${id}/delete_team`, team_data, {
      withCredentials: true
    })
    .then(response => {


    })
    .catch(() =>  null)
  }
}
