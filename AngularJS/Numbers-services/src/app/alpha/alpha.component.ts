import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-alpha',
  templateUrl: './alpha.component.html',
  styleUrls: ['./alpha.component.css']
})
export class AlphaComponent implements OnInit {
  numbers:number[] = [];

  constructor(private _dataService: DataService) { }

  ngOnInit() {}

  generate() {
    console.log("generating...")
    this.numbers = this._dataService.retrieveNumbers(1);
  }
}