import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Bike } from '../../bike';
import { BikeMarketService } from '../../bike-market.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-my',
  templateUrl: './list-my.component.html',
  styleUrls: ['./list-my.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListMyComponent implements OnInit {
  newBike: Bike = new Bike();
  current_user: any = null;
  user_id: any = null;
  my_bikes: Bike[] = [];

  constructor(
    private _bikemarketService: BikeMarketService,
    private _cookieService: CookieService
  ) { }

  ngOnInit() {
    if(this._bikemarketService.logged_in()) {
      this.user_id = this._cookieService.get('userID');
    }
    this._bikemarketService.current_user.subscribe(
      user => this.current_user = user
    );
    this._bikemarketService.retrieveMyBikes(this._cookieService.get('userID'));
    this._bikemarketService.my_bikes.subscribe(
      bikes => {
        this.my_bikes = bikes
      });
  }

  add_bike(id){
    this._bikemarketService.createBike({'bike': this.newBike, 'user_id': id});
    this.newBike = new Bike();
  }
  update(data){
    this._bikemarketService.updateBike(data)
    alert(
      "Bike Updated!"
    )
  }
  delete(id){
    this._bikemarketService.deleteBike({'bike_id': id, 'user_id': this._cookieService.get('userID')});
  }
}
