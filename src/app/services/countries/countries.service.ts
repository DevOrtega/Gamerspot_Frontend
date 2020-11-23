import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private countrySubject: BehaviorSubject<any>;
  public country: Observable<any>;

  constructor(private http: HttpClient) {
    this.countrySubject = new BehaviorSubject<any>(null);
    this.country = this.countrySubject.asObservable();
  }

  public get countryData(): any {
    return this.countrySubject.value;
  }

  getCountries() {
    return this.http.get<any>(`${environment.restCountriesUrl}/all`)
    .pipe(map(countries => {
      this.countrySubject.next(countries);
      return countries;
    }))
  }
}
