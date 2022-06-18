import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AbstractBaseComponent } from '../abstract/abstract-base.component';

@Component({
  selector: 'app-by-country',
  templateUrl: './by-country.component.html',
  styleUrls: ['./by-country.component.scss']
})
export class ByCountryComponent extends AbstractBaseComponent implements OnInit {

  country: string;

  constructor(
    private route: ActivatedRoute
  ) { 
    super();
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.country = params.get('country').toLowerCase();
    });
  }


}
