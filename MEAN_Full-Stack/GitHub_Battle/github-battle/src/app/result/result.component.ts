import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ResultComponent implements OnInit {
  score_1: number = null;
  score_2: number = null;
  user_1: string = null;
  user_2: string = null;
  controller: any = null;
  winner = {username:'', score: 0};
  loser = {username:'', score: 0};

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this._userService.score_1.subscribe(
      score_1 => this.score_1 = score_1
    );
    this._userService.score_2.subscribe(
      score_2 => this.score_2 = score_2
    );
    this._userService.user_1.subscribe(
      user_1 => this.user_1 = user_1
    );
    this._userService.user_2.subscribe(
      user_2 => this.user_2 = user_2
    );
    this._userService.controller.subscribe(
      controller => this.controller = controller
    );
    if(this.score_1 >= this.score_2){
      this.winner.username = this.user_1;
      this.winner.score = this.score_1;
      this.loser.username = this.user_2;
      this.loser.score = this.score_2;
    } else {
      this.winner.username = this.user_2;
      this.winner.score = this.score_2;
      this.loser.username = this.user_1;
      this.loser.score = this.score_1;
    }
  }

  reset(){
    this._userService.resetBattle();
  }

}
