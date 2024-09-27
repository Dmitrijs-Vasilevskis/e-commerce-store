import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MinicartComponent } from '../utility/minicart/minicart/minicart.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Product, ProductEntity } from '../../types/product';
import { CartServiceService } from '../../service/cart/cart-service.service';
import { DeliveryCountryInterface } from '../../types/shipping/methods/omniva/omniva';
import { ShippingOptionsService } from '../../service/shipping/shipping-options/shipping-options.service';
import { AuthComponent } from '../utility/auth/auth/auth.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    MinicartComponent,
    AuthComponent,
    NgClass,
    NgIf,
    NgFor
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  cartItems: ProductEntity[] = [];
  showDeliveryOptions: boolean = false;
  deliveryCountry: DeliveryCountryInterface = {
    country_code: 'LV',
    country_name: 'Latvia'
  };

  shippingLocations: DeliveryCountryInterface[] = [];

  constructor(
    private cartService: CartServiceService,
    private shippingOptionsService: ShippingOptionsService
  ) { }

  ngOnInit(): void {
    // this.cartItems = this.cartService.getItems();
    // todo get cart items
    this.shippingLocations = this.shippingOptionsService.availableShippingCountries;
    this.deliveryCountry = this.deliveryCountry = this.shippingOptionsService.getShippingLocation();
  }

  minicartCount(): number {
    return 1;
  }

  isDeliveryOptionsShown() {
    this.showDeliveryOptions = !this.showDeliveryOptions;
  }

  setDeliveryCountry(shippingLocation: DeliveryCountryInterface) {
    this.shippingOptionsService.setShippingLocation(shippingLocation);

    this.deliveryCountry = this.shippingOptionsService.getShippingLocation();
  }

  getDeliveryCountry() {
    return this.deliveryCountry.country_name;
  }
}
