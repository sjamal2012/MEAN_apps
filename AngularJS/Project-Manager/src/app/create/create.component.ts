import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private _productService: ProductService, private _router: Router) { }

  ngOnInit() {
  }
  create(new_item){
   this._productService.add_product(new_item);
   this._router.navigate(['product_list']);
 }

}
