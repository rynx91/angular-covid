import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { LoadingService } from '../shared/service/loading.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy{

  private destroy$: Subject<boolean> = new Subject<boolean>();
  isLoading: boolean = false;

  constructor(private loadingService: LoadingService) { }

  ngOnInit() {
    this.listenToLoading();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  listenToLoading() {
    this.loadingService.loadingSub
      .pipe(delay(0)) 
      .subscribe((loading) => {
        this.isLoading = loading;
      });
  }


}
