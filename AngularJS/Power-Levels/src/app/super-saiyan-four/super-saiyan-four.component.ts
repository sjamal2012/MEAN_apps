import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-super-saiyan-four',
  templateUrl: './super-saiyan-four.component.html',
  styleUrls: ['./super-saiyan-four.component.css']
})
export class SuperSaiyanFourComponent implements OnInit {
  @Input () power_data;

  constructor() { }

  ngOnInit() {
  }

}
