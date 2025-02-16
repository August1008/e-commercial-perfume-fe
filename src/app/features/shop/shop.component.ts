import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../core/services/shop.service';
import { Product } from '../../shared/models/product';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {

  private shopService = inject(ShopService);
  products: Product[] = [];

  ngOnInit(): void {
    this.shopService.getProducts().subscribe({
      next: response => {
        console.log(response);
        this.products = response.items;
      },
      error: error => console.error(error),
      complete: () => {
        console.log("complete")
      }
    });
  }
}
