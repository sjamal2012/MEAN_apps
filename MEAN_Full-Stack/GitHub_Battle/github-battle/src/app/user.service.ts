import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'Rxjs';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UserService {
  users: BehaviorSubject<any[]> = new BehaviorSubject([]);
  score_1: BehaviorSubject<number> = new BehaviorSubject(null);
  score_2: BehaviorSubject<number> = new BehaviorSubject(null);
  user_1: BehaviorSubject<string> = new BehaviorSubject(null);
  user_2: BehaviorSubject<string> = new BehaviorSubject(null);
  controller: BehaviorSubject<any> = new BehaviorSubject({
      player_1: false,
      player_2: false
  })

  constructor(private _http: Http, private _http2: HttpClient) { }

  retrieveUser(user_info) {
    console.log("retrieveUser parameter: " + user_info.username);
    this._http2.get('https://api.github.com/users/'+ user_info.username).subscribe(
      (user: any) => {
        let score = (user.public_repos + user.followers)*12;
        if(user_info.player == 1){
          this.score_1.next(score);
          this.user_1.next(user.name);
          let tempData = this.controller.getValue();
          if(tempData.player_1 == false){
            tempData.player_1 = true;
            this.controller.next(tempData);
          }
        } else {
          this.score_2.next(score);
          this.user_2.next(user.name);
          let tempData = this.controller.getValue();
          if(tempData.player_2 == false){
            tempData.player_2 = true;
            this.controller.next(tempData);
          }
        }
    })
  }

  retrieveUsers(){
    this._http.get('/get_rankings').subscribe(
      users => this.users.next(users.json()),
      errorResponse => console.log(errorResponse)
    );
  }

  createUsers(users){
    let newUser_1 = {'username': this.user_1.getValue(), 'score': this.score_1.getValue()}
    let newUser_2 = {'username': this.user_2.getValue(), 'score': this.score_2.getValue()}
    this._http.post('/get_rankings', newUser_1).subscribe(
      response => this.retrieveUsers(),
      errorResponse => console.log(errorResponse)
    );
    this._http.post('/get_rankings', newUser_2).subscribe(
      response => this.retrieveUsers(),
      errorResponse => console.log(errorResponse)
    );
  }

  resetBattle(){
    let tempData = this.controller.getValue();
    tempData.player_1 = false;
    tempData.player_2 = false;
    this.controller.next(tempData);
  }
}
