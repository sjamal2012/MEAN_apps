import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  numList_1: number[] = [1, 2, 3];
  numList_2: number[] = [7, 8, 9];
  sum: number = 0;
  constructor() { }

  retrieveNumbers(id): number[] {
    if (id == 1){
      return this.numList_1;
    } else if (id == 2){
      return this.numList_2;
    }
  }

  subtract() {
    let sum_1 = 0;
    let sum_2 = 0;
    this.numList_1.forEach(element => {
      sum_1 += element
    });
    this.numList_2.forEach(element => {
      sum_2 += element
    });
    return (sum_2 - sum_1);
  }
}
