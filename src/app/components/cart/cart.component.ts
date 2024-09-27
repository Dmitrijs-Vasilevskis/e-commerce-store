import { Component, OnInit } from '@angular/core';
import { Product, ProductEntity } from '../../types/product';
import { CartServiceService } from '../../service/cart/cart-service.service';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OmnivaLatviaService } from '../../service/shipping/omniva/omniva-latvia.service';
import { ShippingOptions } from '../../types/shipping/shipping';
import { ShippingOptionsService } from '../../service/shipping/shipping-options/shipping-options.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    RouterLink,
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: ProductEntity[] = [];
  csvData: any[] = [];
  deliveryMethods: ShippingOptions[] = [];

  constructor(
    private cartService: CartServiceService,
    private omnivaLatviaService: OmnivaLatviaService,
    private shippingOptionsService: ShippingOptionsService) {
      
  }

  ngOnInit(): void {
    // this.cartItems = this.cartService.getItems();
    // todo get cart items
    this.csvData = this.omnivaLatviaService.csvData;
    this.deliveryMethods = this.shippingOptionsService.getAvalableShippingMethods();
  }

  increaseQty(id: number) {
    return this.cartService.incrementQty(id);
  }

  decreaseQty(id: number) {
    const cartItem = this.cartItems.find((item) => item.id === id);
    if (cartItem?.qty === 1) {
      return;
    }

    return this.cartService.decrementQty(id);
  }

  getItemTotalPrice(price: String, qty: number): number {
    return Number(price) * qty;
  }

  clearCart() {
    return this.cartService.clearCart();
  }

  changeQty(event: Event, id: number) {
    const targetQty = (event.target as HTMLInputElement).value.replace(/[^0-9]/g, ''),
      item = this.cartItems.find((cartItem) => cartItem.id === id);
    if (targetQty) {
      this.cartService.setQty(id, parseInt(targetQty))
    }
  }

  getCartTotals() {
    return this.cartService.getCartSubtotal();
  }

  getInputQtyValue(qty: number) {
    return `${qty} pcs.`;
  }

  clearItemById(id: number) {
    return this.cartService.clearItemById(id);
  }
}
