import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sum: number = 0;
  constructor(private _dataService: DataService) { }

  get_diff(){
    this.sum = this._dataService.subtract();
  }
}
