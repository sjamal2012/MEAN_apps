import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BikeMarketService } from './../bike-market.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BrowseComponent implements OnInit {

  constructor(private _bikemarketService: BikeMarketService) { }

  ngOnInit() {
  }

  logout(){
    this._bikemarketService.logout();
  }
}
