import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUrl;
  constructor(private location: Location) { 
    this.currentUrl = this.location.path();
  }

  ngOnInit(): void {
  }

}
