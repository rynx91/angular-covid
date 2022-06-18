import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TableViewRoutingModule } from './table-view-routing.module';
import { TableViewComponent } from './table-view.component';

@NgModule({
  declarations: [
    TableViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TableViewRoutingModule
  ]
})
export class TableViewModule { }
