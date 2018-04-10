import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TeamService } from '../../team.service';
import { Player } from '../../player';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit {
  team: Player[] = [];

  constructor(private _teamService: TeamService) { }

  ngOnInit() {
    this._teamService.teamObserver.subscribe(
      team => this.team = team
    );
    this._teamService.retrievePlayers();
  }

  delete(id){
    this._teamService.deletePlayer(id);
  }

}
