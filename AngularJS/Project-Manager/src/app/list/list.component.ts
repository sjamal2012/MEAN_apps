import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  products: any[];
  constructor(private _productService: ProductService, private _router: Router) { }

  ngOnInit() {
    this._productService.products.subscribe(
      (products) => { this.products = products }
    )
  }
  edit(i){
    this._router.navigate(['product_edit', i])
  }
  delete(i){
    this._productService.delete_product(i)
  }

}
