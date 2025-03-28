import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadge } from '@angular/material/badge';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatBadge,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  activeRouterLink = signal<string>('');
  activeRouterLinkValue = computed(() => {
    return this.activeRouterLink().valueOf();
  })

  ngOnInit(): void {
    const cart_id = localStorage.getItem('cart_id');
    if (cart_id) {
      this.cartService.getCart(cart_id);
    }
  }
  cartService = inject(CartService);

  public activateRouterLink(routerLink: string) {
    this.activeRouterLink.update((value => routerLink));
    console.log(this.activeRouterLink());
    console.log(this.activeRouterLinkValue())
  }

}
