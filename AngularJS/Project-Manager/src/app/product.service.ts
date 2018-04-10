import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'Rxjs';

@Injectable()
export class ProductService {
  products: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor() { }

  add_product(product){
    const tempData = this.products.getValue();
    tempData.push(product);
    this.products.next(tempData);
  }
  edit_product(data){
    const tempData = this.products.getValue();
    tempData.splice(data.id, 1);
    tempData.splice(data.id, 0, data.product)
    this.products.next(tempData);
  }
  delete_product(i){
    const tempData = this.products.getValue();
    tempData.splice(i, 1);
    this.products.next(tempData);
  }
}
