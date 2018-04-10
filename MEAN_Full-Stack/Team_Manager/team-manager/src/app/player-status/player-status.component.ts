import { Component, OnInit } from '@angular/core';
import { TeamService } from './../team.service';
import { Player } from './../player';

@Component({
  selector: 'app-player-status',
  templateUrl: './player-status.component.html',
  styleUrls: ['./player-status.component.css']
})
export class PlayerStatusComponent implements OnInit {
  team: Player[] = [];
  iterator = [];
  game = [];

  constructor(private _teamService: TeamService) { }

  ngOnInit() {
    this._teamService.teamObserver.subscribe(
      team => this.team = team
    );
    this._teamService.iteratorObserver.subscribe(
      iterator => this.iterator = iterator
    );
    this._teamService.gameObserver.subscribe(
      game => this.game = game
    );
    this._teamService.retrievePlayers();
    if (this.iterator.length < 1) {
      let i = 0;
      while (i < this._teamService.games){
        let arr = [];
        this.team.forEach(element => {
          let playing = false;
          let not_playing = false;
          let undecided = true;
          arr.push(
            {playing,
            not_playing,
            undecided}
          );
        });
        this.iterator.push(arr);
        i++;
      }
    }
    this.game = this.iterator[0];
  }

  show_game(i){
    let g = i + 1;
    this.game = this.iterator[i]
  }
  
  playing(i) {
    if (this.game[i].playing == false) {
      this.game[i].playing = true;
      this.game[i].not_playing = false;
      this.game[i].undecided = false;
    }
  }
  not_playing(i) {
    if (this.game[i].not_playing == false) {
      this.game[i].not_playing = true;
      this.game[i].playing = false;
      this.game[i].undecided = false;
    }
  }
  undecided(i) {
    if (this.game[i].undecided == false) {
      this.game[i].undecided = true;
      this.game[i].playing = false;
      this.game[i].not_playing = false;
    }
  }
}
