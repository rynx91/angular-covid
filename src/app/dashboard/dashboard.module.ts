import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CasesChartsComponent } from './cases-charts/cases-charts.component';
import { ContinentsViewComponent } from './continents-view/continents-view.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { DashboardComponent } from './dashboard.component';
import { DeathsChartsComponent } from './deaths-charts/deaths-charts.component';
import { AccumulatedChartsComponent } from './continents-view/accumulated-charts/accumulated-charts.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CasesChartsComponent,
    DeathsChartsComponent,
    DashboardViewComponent,
    ContinentsViewComponent,
    AccumulatedChartsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ],
  exports: [
    CasesChartsComponent,
    DeathsChartsComponent,
    DashboardViewComponent
  ]
})
export class DashboardModule { }
