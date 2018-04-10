import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TeamService } from '../../team.service';
import { Player } from '../../player';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddComponent implements OnInit {
  newPlayer: Player = new Player();

  constructor(private _teamService: TeamService) { }

  ngOnInit() {}

  create(player: Player) {
    this._teamService.createPlayer(this.newPlayer);
    this.newPlayer = new Player();
  }

}
