import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { config } from '../../shared/configs/config';
import { Cart, CartItem } from '../../shared/models/cart';
import { Product } from '../../shared/models/product';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl: string = config.BASE_URL;
  private http = inject(HttpClient);
  cart = signal<Cart | null>(null);
  itemsCount = computed(() => {
    return this.cart()?.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  })
  
  constructor() { }

  getCart(id: string) {
    return this.http.get<Cart>(this.baseUrl + 'cart/get-cart/' + id).subscribe({
      next: cart => this.cart.set(cart)
    })
  }

  setCart(cart: Cart) {
    return this.http.post<Cart>(this.baseUrl + 'cart/create-or-update', cart).subscribe({
      next: cart => {
        this.cart.set(cart);
        const cart_id = this.cart()?.id;
        if (cart_id) {
          localStorage.setItem('cart_id', cart_id);
        }
      }
    })
  }

  addItemToCart(item: CartItem | Product, quantity = 1) {
    const cart = this.cart() ?? this.createCart();

    if (this.isProduct(item)) {
      const cartItem = this.mapProductToCartItem(item);
      const itemIndex = cart.cartItems.findIndex(i => i.productId === cartItem.productId);
      if (itemIndex < 0) {
        cartItem.quantity = quantity;
        cart.cartItems.push(cartItem);
      }
      else {
        cart.cartItems[itemIndex].quantity += quantity;
      }
    }
    this.setCart(cart);
    
  }
  mapProductToCartItem(item: Product): CartItem {
    return {
      productId: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity: item.quantity,
      brand: item.brand,
      type: item.type
    };
  }


  private createCart(): Cart {
    const cart = new Cart();
    return cart;
  }

  private isProduct(item: CartItem | Product): item is Product {
    return (item as Product).id !== undefined;
  }
}


