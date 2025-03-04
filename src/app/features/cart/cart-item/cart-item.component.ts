import { Component, input, Input } from '@angular/core';
import { CartItem } from '../../../shared/models/cart';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    CurrencyPipe
  ],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  cartItem = input.required<CartItem>()
}
