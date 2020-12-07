import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Gamer } from 'src/app/interfaces/gamer';
import { Gamerprofiledata } from 'src/app/interfaces/gamerprofiledata';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GamersService {

  private profileSubject: BehaviorSubject<Gamerprofiledata>;
  public profile: Observable<Gamerprofiledata>;

  constructor(private http: HttpClient, private datePipe: DatePipe) {
    this.profileSubject = new BehaviorSubject<Gamerprofiledata>(null);
    this.profile = this.profileSubject.asObservable();
  }

  public get profileData(): Gamerprofiledata {
    return this.profileSubject.value;
  }

  public getGamers(team?, sponsor?) {
    if (team) {
      return this.http.get<any>(`${environment.apiUrl}/gamers?team=${team}`, { withCredentials: true })
      .pipe(map(gamers => {
        this.profileSubject.next(gamers);
        return gamers;
      }));
    }
    if (sponsor) {
      return this.http.get<any>(`${environment.apiUrl}/gamers?sponsor=${sponsor}`, { withCredentials: true })
      .pipe(map(gamers => {
        this.profileSubject.next(gamers);
        return gamers;
      }));
    }
    return this.http.get<any>(`${environment.apiUrl}/gamers`)
      .pipe(map(gamers => {
        this.profileSubject.next(gamers);

        return gamers;
      }))
  }

  public getGamerById(id: string) {
    return this.http.get<any>(`${environment.apiUrl}/gamers/${id}`, { withCredentials: true })
      .pipe(map((gamer: Gamerprofiledata) => {
        this.profileSubject.next(gamer);

        return gamer;
      }))
  }

  public registerGamer(gamerdata: Gamer) {
    return this.http.post<any>(`${environment.apiUrl}/gamers/register`, gamerdata);
  }

  public editGamer(id: string, gamer_data: Gamerprofiledata) {
    return this.http.patch(`${environment.apiUrl}/gamers/${id}`, gamer_data, { withCredentials: true })
      .pipe(map((gamer: Gamerprofiledata) => {
        this.profileSubject.next(gamer);

        return gamer;
      }))
  }

  public removeGamer(gamer) {
    return this.http.delete<any>(`${environment.apiUrl}/gamers/${gamer._id}`, gamer);
  }

  public formatDateToDDMMYYYY(date: string) {
    return this.datePipe.transform(date, "dd/MM/yyyy");
  }

  public formatDateToYYYYMMDD(date: string) {
    return this.datePipe.transform(date, "yyyy/MM/dd");
  }

  public formatDateToMMMMDDYYYY(date: string) {
    return this.datePipe.transform(date, "MMMM dd, yyyy - H:mm:ss");
  }
}
