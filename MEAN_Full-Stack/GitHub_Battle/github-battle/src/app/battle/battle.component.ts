import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../user.service';
import { User } from './../user';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BattleComponent implements OnInit {
  newUser: User = new User();
  score_1: number = null;
  score_2: number = null;
  user_1: string = null;
  user_2: string = null;
  controller: any = null;

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
  }

  onSubmit(user_info){
    this._userService.retrieveUser(user_info);
  }

  battle(users){
    this._userService.createUsers(users)
  }
}
