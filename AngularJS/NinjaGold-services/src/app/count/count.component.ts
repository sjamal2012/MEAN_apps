import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.css']
})
export class CountComponent implements OnInit {
  data = this._dataService.data;
  constructor(private _dataService: DataService) { }

  ngOnInit() {
  }

}
