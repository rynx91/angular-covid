import { Component, Input, OnInit } from '@angular/core';
import { AbstractBaseComponent } from 'src/app/abstract/abstract-base.component';
import { countryList } from 'src/app/model/country.constants';
import { CovidHistoryByCountryInterface, CovidHistoryInterface, CovidInfoInterface } from 'src/app/model/covid.type';
import { CovidService } from 'src/app/shared/service/covid.service';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss']
})
export class DashboardViewComponent extends AbstractBaseComponent implements OnInit {

  @Input() country:string;

  isLoading: boolean = false;
  statistics: CovidInfoInterface;
  globalHistory: CovidHistoryInterface;
  countryHistory: CovidHistoryByCountryInterface;
  selectedCountry: string = '';
  flag;
  countryList;

  constructor(
    private covidService: CovidService
  ) {
    super();
   }

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
