import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { countryList } from 'src/app/model/country.constants';
import { CovidHistoryByCountryInterface, CovidHistoryInterface, CovidInfoInterface } from 'src/app/model/covid.type';
import { CovidService } from 'src/app/shared/service/covid.service';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss']
})
export class DashboardViewComponent implements OnInit, OnDestroy {

  @Input() country:string;

  private destroy$: Subject<boolean> = new Subject<boolean>();
  isLoading: boolean = false;
  statistics: CovidInfoInterface;
  globalHistory: CovidHistoryInterface;
  countryHistory: CovidHistoryByCountryInterface;
  selectedCountry: string = '';
  flag;
  countryList;

  constructor(
    private covidService: CovidService
  ) { }

  ngOnInit() {
    this.countryList = countryList;
    if(!!this.country) {
      this.selectedCountry = this.country;
      this.getCountryData();
    } else {
      this.getGlobalHistory();
      this.getStatisticsByCountry();
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getStatisticsByCountry() {
    this.covidService.getStatisticsByCountry(this.selectedCountry).subscribe(res=> {
      this.statistics = res;
    });
  }

  getHistoryByCountry() {
    this.covidService.getHistoryByCountry(this.selectedCountry).subscribe(res => {
      this.countryHistory = res;
    });
  }

  getGlobalHistory() {
    this.covidService.getGlobalHistory().subscribe(res => {
      this.globalHistory = res;
    });
  }

  getCountryData() {
    this.getHistoryByCountry();
    let c = this.countryList.find(f => (f.name).toLowerCase()===this.selectedCountry);
    this.flag = !!c ? c.flag : '';
    this.getStatisticsByCountry();
  }

}
