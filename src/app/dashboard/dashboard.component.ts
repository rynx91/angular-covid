import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractBaseComponent } from '../abstract/abstract-base.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends AbstractBaseComponent implements OnInit, OnDestroy{

  isLoading: boolean = false;

  constructor() { 
    super();
  }

  ngOnInit() {
  }

}
