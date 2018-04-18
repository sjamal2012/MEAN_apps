import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../user';
import { BikeMarketService } from '../bike-market.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  newUser: User = new User();
  bike = null;
  current_user = null;
  confirm_password = '';
  login_errors = '';
  registration_errors = '';

  constructor(
    private _bikemarketService: BikeMarketService,
    private router: Router) { }

  ngOnInit() {
    this._bikemarketService.retrieveBikes();
    this._bikemarketService.bikes.subscribe(
      bikes => {
        let rand_index = Math.floor(Math.random()*bikes.length);
        this.bike = bikes[rand_index];
      }
    )
    this._bikemarketService.current_user.subscribe(
      user => this.current_user = user
    );
    this.login_errors = '';
    this.registration_errors = '';
  }

  register(user: User){
    this._bikemarketService.createUser(this.newUser);
    setTimeout(() => {
      if(this.current_user != null){
        this.router.navigateByUrl('/dashboard');
      } else {
        this.registration_errors = 'user already exists';
      }
    }, 300);
    this.newUser = new User();
    this.confirm_password = '';
  }

  login(user){
    this._bikemarketService.login(user);
    setTimeout(() => {
      if(this.current_user != null){
        this.router.navigateByUrl('/dashboard');
      } else {
        this.login_errors = 'email or password incorrect';
      }
    }, 300);
  }
}
