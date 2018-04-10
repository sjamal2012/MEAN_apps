import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  colorArr = ['#7a00ec','#ffc0cb','#a97dff','#d996f5','#694eff', '#ffa4f8'];
  rand_n = function(){
    return Math.floor(Math.random()*this.colorArr.length);
}
