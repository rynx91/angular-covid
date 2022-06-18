import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CovidHistoryByCountryInterface, CovidHistoryInterface, CovidInfoInterface } from 'src/app/model/covid.type';

@Injectable({
  providedIn: 'root'
})
export class CovidService {
  baseURL = 'https://disease.sh/v3/covid-19/';

  constructor(
    private httpClient: HttpClient
  ) { }

  getStatisticsByCountry(country:string): Observable<CovidInfoInterface>  {
    const url = !!country ? 'countries/'+country : 'all';
    return this.httpClient.get<CovidInfoInterface>(`${this.baseURL}`+url);
  }

  getStatisticsForContinents(): Observable<CovidInfoInterface[]>  {
    return this.httpClient.get<CovidInfoInterface[]>(`${this.baseURL}continents`);
  }

  getTotalForAllCountries(period:string): Observable<CovidInfoInterface[]> {
    let params = new HttpParams();
    if(!!period) {
      params = params.append(period, 'true');
    }
    return this.httpClient.get<CovidInfoInterface[]>(`${this.baseURL}countries`, { params });
  }

  getGlobalHistory(): Observable<CovidHistoryInterface> {
    return this.httpClient.get<CovidHistoryInterface>(`${this.baseURL}historical/all?lastdays=all`);
  }

  getHistoryByCountry(country:string): Observable<CovidHistoryByCountryInterface> {
    return this.httpClient.get<CovidHistoryByCountryInterface>(`${this.baseURL}historical/`+country+`?lastdays=all`);
  }
}
