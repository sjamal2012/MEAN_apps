import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from './../user.service';
import { User } from './../user';
import {Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RankingsComponent implements OnInit {
  users = [];

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this._userService.retrieveUsers();
    this._userService.users.subscribe(
      users => this.users = users
    );
  }
}
