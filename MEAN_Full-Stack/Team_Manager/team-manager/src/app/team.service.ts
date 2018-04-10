import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Player } from './player';
import { BehaviorSubject } from 'Rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class TeamService {
  teamObserver = new BehaviorSubject([]);
  iteratorObserver = new BehaviorSubject([]);
  gameObserver = new BehaviorSubject([]);
  games = 3;

  constructor(private _http: Http) { }

  retrievePlayers() {
    this._http.get('/players').subscribe(
      team => this.teamObserver.next(team.json()),
      errorResponse => console.log(errorResponse)
    );
  }

  createPlayer(player: Player) {
    console.log("service: creating player...")
    this._http.post('/players', player).subscribe(
      response => this.retrievePlayers(),
      errorResponse => console.log(errorResponse)
    )
  }

  deletePlayer(id) {
    console.log(id)
    this._http.delete('/players/'+id).subscribe(
      response => this.retrievePlayers(),
      errorResponse => console.log(errorResponse)
    )
  }
}