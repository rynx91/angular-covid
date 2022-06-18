import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService{
  baseURL = 'http://universities.hipolabs.com/';

  constructor(
    private httpClient: HttpClient
  ) { }

  getCountryList(): Observable<any> {
    return this.httpClient.get("https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist.json");
    
  }
}
