import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ByCountryComponent } from './by-country.component';
import { ByCountryRoutesModule } from './by-country-routing.module';
import { DashboardModule } from '../dashboard/dashboard.module';

@NgModule({
  declarations: [
    ByCountryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ByCountryRoutesModule,
    DashboardModule
  ]
})
export class ByCountryModule { }
