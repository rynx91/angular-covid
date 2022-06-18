import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    FormsModule
  ], 
  exports: [
    MaterialModule,
    TranslateModule,
    FormsModule
  ]
})
export class SharedModule { }
