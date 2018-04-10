import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-beta',
  templateUrl: './beta.component.html',
  styleUrls: ['./beta.component.css']
})
export class BetaComponent implements OnInit {
  numbers:number[] = [];

  constructor(private _dataService: DataService) { }

  ngOnInit() {}

  generate() {
    this.numbers = this._dataService.retrieveNumbers(2);
  }
}
