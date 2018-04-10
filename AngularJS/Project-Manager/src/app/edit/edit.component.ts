import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  product: any;
  id: any;
  constructor(private _productService: ProductService, private _router: Router, private _route: ActivatedRoute) {
    this._route.paramMap.subscribe(params => {
      this.id = params.get('id');
    })
    this._productService.products.subscribe(
      (products) => {
        this.product = products[this.id];
        console.log(this.product)
      }
      )
  }

  ngOnInit() {
    }

  update(new_item){
    this._productService.edit_product({'product':new_item, 'id':this.id});
    this._router.navigate(['product_list']);
  }
  delete(){
    this._productService.delete_product(this.id);
    this._router.navigate(['product_list']);
  }

}
