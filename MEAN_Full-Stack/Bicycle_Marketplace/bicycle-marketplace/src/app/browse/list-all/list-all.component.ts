import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Bike } from '../../bike';
import { User } from '../../user';
import { BikeMarketService } from '../../bike-market.service';
import { CookieService } from 'ngx-cookie-service';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-list-all',
  templateUrl: './list-all.component.html',
  styleUrls: ['./list-all.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListAllComponent implements OnInit {
  bikes: Bike[] = [];
  user_id: any = null;
  contact_info: any = null;

  constructor(
    private _bikemarketService: BikeMarketService,
    private _cookieService: CookieService
  ) { }

  ngOnInit() {
    this._bikemarketService.bikes.subscribe(
      bikes => this.bikes = bikes
    );
    this._bikemarketService.contact_info.subscribe(
      user => this.contact_info = user
    );
    if(this._bikemarketService.logged_in()) {
      this.user_id = this._cookieService.get('userID');
    }
    this._bikemarketService.retrieveBikes();
  }
  delete(id){
    this._bikemarketService.deleteBike({'bike_id': id, 'user_id': this._cookieService.get('userID')});
  }
  hover(user){
    this._bikemarketService.getUser(user);
  }
  contact(){
    console.log('contact clicked')
    alert(
      'Name: ' + this.contact_info.first_name + ' ' + this.contact_info.last_name+'\n'+
      'Email:  '+ this.contact_info.email
    )
  }
}
