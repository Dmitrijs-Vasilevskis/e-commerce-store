import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CartServiceService } from '../../service/cart/cart-service.service';
import { RouterLink } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe, NgClass, NgComponentOutlet, NgFor, NgIf } from '@angular/common';
import { ShippingOptionsService } from '../../service/shipping/shipping-options/shipping-options.service';
import { DeliveryCountryInterface } from '../../types/shipping/methods/omniva/omniva';
import { DeliveryTypeKeys, ShippingOptions } from '../../types/shipping/shipping';
import { DynamicRendererComponent } from '../utility/dynamicRendered/dynamic-renderer/dynamic-renderer.component';
import { TypeMappedDeliveryMethods } from '../../types/shipping/shipping';
import { DynamicShippingItem } from '../../types/shipping/dynamic.types';
import { ProductEntity } from '../../types/product';
import { regExpPatterns } from '../../types/validators/formValidators';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    RouterLink,
    CurrencyPipe,
    ReactiveFormsModule,
    NgIf,
    NgFor,
    NgClass,
    NgComponentOutlet,
    DynamicRendererComponent
  ],
  animations: [
    trigger('expandDiv', [
      state('collapsed', style({
        height: '0px',
        opacity: 0,
        margin: '0px',
        display: 'none'
      })),
      state('expanded', style({
        height: 'auto',
        opacity: 1,
        display: 'block'
      })),
      transition('collapsed <=> expanded', [
        animate('.3s ease-in-out')
      ])
    ])
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})

export class CheckoutComponent implements OnInit {

  availableShippingCountries: DeliveryCountryInterface[] = [];
  cartItems: ProductEntity[] = [];
  availableShippingMethods: ShippingOptions[] = [];

  selectedShippingLocation: DeliveryCountryInterface = {
    country_code: '',
    country_name: ''
  }

  orderForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required, Validators.pattern(regExpPatterns.email)]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address1: ['', [Validators.required, Validators.pattern(regExpPatterns.address)]],
    address2: ['', Validators.pattern(regExpPatterns.address)],
    zipCode: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.pattern(regExpPatterns.phone)]],
    city: ['', Validators.required],
    region: ['',],
    countryCode: ['', Validators.required]
  });

  comopnents!: DynamicShippingItem[];
  isShippingVisible: boolean = false;
  isAddressFormSubmitted: boolean = false;

  @ViewChild('asd', { read: ViewContainerRef }) taskEntry!: ViewContainerRef;

  constructor(
    private formBuilder: FormBuilder,
    private shippingOptionsService: ShippingOptionsService,
    private cartService: CartServiceService,
  ) {
    this.availableShippingCountries = this.shippingOptionsService.availableShippingCountries;
    this.availableShippingMethods = this.shippingOptionsService.availableShippingMethods;
    this.comopnents = this.getDynamicShippingOptionsComponents();
  }

  ngOnInit(): void {
    // todo: quote 
    // this.cartItems = this.getCartItems();
    this.selectedShippingLocation = this.shippingOptionsService.getShippingLocation();
    this.orderForm.controls.countryCode.setValue(this.selectedShippingLocation.country_code);
  }

  onSubmit() {
    if (this.orderForm.valid) {
      console.log('Form Submitted', this.orderForm.value);
      // Further processing of the form data
    } else {
      console.log('Form is invalid');
    }
  }

  submitAddressForm() {
    if (this.orderForm.valid) {
      const {
        email,
        firstName,
        lastName,
        address1,
        address2,
        zipCode,
        phoneNumber,
        city,
        region,
        countryCode
      } = this.orderForm.value;

      // this.quote.quote.customer = {
      //   email: email as string,
      //   firstName: firstName as string,
      //   lastName: lastName as string,
      //   telephone: phoneNumber as string
      // }

      // this.quote.quote.billingAddress = {
      //   region: region as string,
      //   country_code: countryCode as string,
      //   street: address1 as string,
      //   street2: address2 as string,
      //   telephone: phoneNumber as string,
      //   city: city as string,
      //   postCode: zipCode as string,
      //   firstName: firstName as string,
      //   lastName: lastName as string,
      //   email: email as string,
      // }

      this.isShippingVisible = !this.isShippingVisible;
      this.isAddressFormSubmitted = !this.isAddressFormSubmitted;

      // console.log(this.quote.quote);
    } else {
      console.log('Form is invalid', this.orderForm);
    }
  }


  handleDeliveryMethod(data: any) {
    // this.quote = data;
    // console.log('Data from child:', this.quote);
  }

  getDefaultSelectedCountry() {
    return this.selectedShippingLocation;
  }

  getDynamicShippingOptionsComponents(): DynamicShippingItem[] {
    let components: DynamicShippingItem[] = [];

    this.availableShippingMethods.forEach(method => {
      const carrierCode = method.carrier_code as DeliveryTypeKeys;

      if (TypeMappedDeliveryMethods[carrierCode]) {
        components.push(new DynamicShippingItem(TypeMappedDeliveryMethods[carrierCode], method));
      }
    });

    return components;
  }

  getCartItems() {
    return this.cartService.getItems();
  }

  getCartSubtotal() {
    return this.cartService.getCartSubtotal();
  }

  isCartHasDiscount() {
    return this.cartService.isCartHasDiscount();
  }

  getOrderTotal() {
    return this.cartService.getCartSubtotal();
  }
}
