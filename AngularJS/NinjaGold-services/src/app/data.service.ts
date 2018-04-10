import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  data = {count: 0, events: []}

  constructor() { }

  updateGold(building): number {
    if (building == 'farm'){
      let gold = Math.floor(Math.random()*4 + 2)
      this.data.count = this.data.count + gold;
      this.data.events.push({ gold:gold, count:this.data.count, win_loss: "earned"})
      return this.data.count;
    }
    else if (building == 'cave'){
      let gold = Math.floor(Math.random()*6 + 5);
      this.data.count += gold;
      this.data.events.push({ gold:gold, count:this.data.count, win_loss: "earned"})
      return this.data.count;
    }
    else if (building == 'casino'){
      if (Math.random() > 0.5){
        var sign = -1;
        var win_loss = "lost";
      } else { 
        var sign = 1;
        var win_loss = "won";
      }
      let gold = sign*(Math.floor(Math.random()*100 + 1));
      this.data.count += gold;
      this.data.events.push({ gold:gold, count:this.data.count, win_loss:win_loss})
      return this.data.count;
    }
    else if (building == 'house'){
      let gold = Math.floor(Math.random()*9 + 7);
      this.data.count += gold;
      this.data.events.push({ gold:gold, count:this.data.count, win_loss: "earned"})
      return this.data.count;
    }
  }

}
