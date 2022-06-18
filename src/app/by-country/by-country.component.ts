import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-by-country',
  templateUrl: './by-country.component.html',
  styleUrls: ['./by-country.component.scss']
})
export class ByCountryComponent implements OnInit {

  country: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.country = params.get('country').toLowerCase();
    });
  }


}
