import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, PageEvent, Sort } from '@angular/material';
import { AbstractBaseComponent } from '../abstract/abstract-base.component';
import { CovidInfoInterface } from '../model/covid.type';
import { CovidService } from '../shared/service/covid.service';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent extends AbstractBaseComponent implements OnInit, AfterViewInit {

  @ViewChild('paginator', {static: false}) paginator: MatPaginator;

  allCountryList: CovidInfoInterface[];
  isLoading: boolean = false;
  period = '';

  //table properties
  dataSource: MatTableDataSource<CovidInfoInterface> = new MatTableDataSource();
  displayedColumns: string[ ] = ['index', 'country', 'cases', 'todayCases', 'deaths', 'todayDeaths', 'recovered', 
                                'todayRecovered', 'active', 'critical', 'casesPerOneMillion', 'deathsPerOneMillion', 
                                'tests','testsPerOneMillion', 'population'];
  pageSizeOptions = [10, 20, 50, 100, 200, 300];
  pageSize = 300;
  length = 100;
  pageIndex = 0;

  constructor(
    private covidService: CovidService
  ) { 
    super();
  }

  ngOnInit() {
    this.getTableView(this.period);
  }

  ngAfterViewInit(): void {   
    this.dataSource.paginator = this.paginator;
  }

  getTableView(period) {
    this.period = period;
    this.covidService.getTotalForAllCountries(this.period).subscribe(res =>{
      this.allCountryList = res;
      this.dataSource.data = this.allCountryList;
      this.setPagination(
        res.length,
        this.pageIndex,
        this.pageSize
      );
    });
  }

  updatePageInfo(pageEvent: PageEvent) {
    this.pageSize = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;
  }

  setPagination(length: number, startIndex: number, pageSize: number) {
    this.length = length;
    this.pageIndex = startIndex;
    this.pageSize = pageSize;
  }

  sortData(sort: Sort) {
    const data = this.allCountryList.slice();
    let sortedData;
    if (!sort.active || sort.direction === '') {
      sortedData = data;
      return;
    }

    sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'country':
          return this.compare(a.country, b.country, isAsc);
        case 'cases':
          return this.compare(a.cases, b.cases, isAsc);
        case 'todayCases':
          return this.compare(a.todayCases, b.todayCases, isAsc);
        case 'deaths':
          return this.compare(a.deaths, b.deaths, isAsc);
        case 'recovered':
          return this.compare(a.recovered, b.recovered, isAsc);
        case 'todayRecovered':
          return this.compare(a.todayRecovered, b.todayRecovered, isAsc);
        case 'active':
          return this.compare(a.active, b.active, isAsc);
        case 'critical':
          return this.compare(a.critical, b.critical, isAsc);
        case 'casesPerOneMillion':
          return this.compare(a.casesPerOneMillion, b.casesPerOneMillion, isAsc);
        case 'deathsPerOneMillion':
          return this.compare(a.deathsPerOneMillion, b.deathsPerOneMillion, isAsc);
        case 'tests':
          return this.compare(a.tests, b.tests, isAsc);
        case 'testsPerOneMillion':
          return this.compare(a.testsPerOneMillion, b.testsPerOneMillion, isAsc);
        case 'population':
          return this.compare(a.population, b.population, isAsc);
        default:
          return 0;
      }
    });
    this.dataSource.data = sortedData;
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
