import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  bannerImageUrl = 'assets/images/banner04.png';
  constructor() { }

  ngOnInit(): void {

  }

}
