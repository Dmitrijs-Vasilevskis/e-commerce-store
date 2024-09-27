import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CartServiceService } from '../../../../service/cart/cart-service.service';
import { Product, ProductEntity } from '../../../../types/product';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { Router, RouterLink, UrlSerializer } from '@angular/router';
import { GraphqlCatalogService } from '../../../../service/catalog/graphql-catalog.service';
import { QuoteInterface } from '../../../../types/quote/quote.types';

@Component({
  selector: 'app-minicart',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    RouterLink,
    CurrencyPipe
  ],
  templateUrl: './minicart.component.html',
  styleUrl: './minicart.component.css'
})
export class MinicartComponent implements OnInit {
  cartItems: ProductEntity[] = [];
  quote!: QuoteInterface;
  constructor(
    private cartService: CartServiceService,
    private router: Router,
    private serialize: UrlSerializer,
    private graphqlCatalogService: GraphqlCatalogService
  ) {

  }
  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((cartItems) => {
      if (cartItems) {
        this.cartItems = cartItems;
      }
    });

    this.cartService.getQuote().subscribe((quote) => {
      if (quote) {
        this.quote = quote;
        console.log('>> quote', quote);
      }
    })
  }

  clearCart() {
    this.cartService.clearCart();
  }

  getItemPrice(id: number) {
    return this.cartService.getProductPrice(id);
  }

  getCartSubtotal() {
    return this.quote.grand_total;
  }
}
