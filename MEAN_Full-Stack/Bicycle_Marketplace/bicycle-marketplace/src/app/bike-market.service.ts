import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class BikeMarketService {
  current_user: BehaviorSubject<any> = new BehaviorSubject(null);
  login_errors = null;
  bikes: BehaviorSubject<any[]> = new BehaviorSubject([]);
  my_bikes: BehaviorSubject<any[]> = new BehaviorSubject([]);
  contact_info: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private _http: Http,
    private _http2: HttpClient,
    private _cookieService: CookieService
  ) { }

  createUser(user){
    this._http.post('/new_user', user).subscribe(
      user => this.current_user.next(user.json()),
      errorResponse => console.log(errorResponse)
    );
  }
  getUser(user){
    this._http.get('/get_user/'+user).subscribe(
      user => {
        this.contact_info.next(user.json())
      });
  }
  login(user){
    this._http.post('/login', user).subscribe(
      user => {
        if(user==null){
          this.login_errors = 'email or password is incorrect';
        }
        this.current_user.next(user.json())
      },
      errorResponse => console.log(errorResponse)
    );
  }
  logout(){
    this.login_errors = '';
    this._http.delete('/logout').subscribe(
      response => this.current_user.next(response.json())
    );
  }
  logged_in(): boolean {
    const session = this._cookieService.get('session');
    const userID = this._cookieService.get('userID');
    const expiration = parseInt(this._cookieService.get('expiration'), 10);

    return session && expiration && userID && expiration > Date.now();
  }

  createBike(data){
    this._http.post('/new_bike/'+data.user_id, data).subscribe(
      bikes => {
        console.log('added bike')
        this.retrieveMyBikes(data.user_id)
      })
  }
  retrieveBikes() {
    this._http.get('/bikes').subscribe(
      bikes => this.bikes.next(bikes.json()),
      errorResponse => console.log(errorResponse)
    );
  }
  retrieveMyBikes(id) {
    console.log('grabbing my bikes...')
    this._http.get('/my_bikes/'+id).subscribe(
      bikes => this.my_bikes.next(bikes.json()),
      errorResponse => console.log(errorResponse)
    );
  }
  updateBike(data){
    this._http.post('/update_bike/'+data.bike_id, data.new_bike).subscribe(
      response => {
        console.log('updated bike')
        this.retrieveMyBikes(this._cookieService.get('userID'))
      }
    )
  }
  deleteBike(data){
    this._http.post('/delete_bike/'+data.bike_id, data).subscribe(
      bikes => {
        this.retrieveBikes();
        this.retrieveMyBikes(data.user_id);
      })
  }
}
