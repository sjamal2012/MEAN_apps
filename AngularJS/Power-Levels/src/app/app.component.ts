import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  power_data = {
    power: null,
    submitted: false
  }
  selecting(){
    console.log("selecting...")
    this.power_data.submitted = false;
  }
  calculate(data){
    console.log(data)
    this.power_data.power = data.value;
    this.power_data.submitted = data.submitted;
  }

}
