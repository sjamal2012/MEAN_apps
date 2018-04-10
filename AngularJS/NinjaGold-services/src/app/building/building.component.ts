import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit {
  constructor(private _dataService: DataService) {}
  ngOnInit() {}

  onSubmit(building){
    this._dataService.updateGold(building);
  }
}
