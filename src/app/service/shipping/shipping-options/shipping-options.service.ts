import { Injectable } from '@angular/core';
import { ShippingOptions } from '../../../types/shipping/shipping';
import { DeliveryCountryInterface } from '../../../types/shipping/methods/omniva/omniva';
import { LocalStorageServiceService } from '../../localStorage/local-storage-service.service';
import { OmnivaComponent } from '../../../components/delivery/omniva/omniva.component';
import { StorePickupComponent } from '../../../components/delivery/storePickup/store-pickup.component';
import { CourierComponent } from '../../../components/delivery/courier/courier.component';
import { DynamicShippingItem } from '../../../types/shipping/dynamic.types';

@Injectable({
  providedIn: 'root'
})

export class ShippingOptionsService {

  public selectedShippingLocation: DeliveryCountryInterface = {
    country_code: 'LV',
    country_name: 'Latvia'
  };

  public availableShippingCountries: DeliveryCountryInterface[] = [
    {
      country_code: 'LV',
      country_name: 'Latvia'
    },
    {
      country_code: 'LT',
      country_name: 'Lithuania'
    },
    {
      country_code: 'EE',
      country_name: 'Estonia'
    }
  ];

  public availableShippingMethods: ShippingOptions[] = [
    {
      carrier_code: "omniva_parcel_terminal",
      carrier_title: "Omniva parcel terminal",
      method_code: "omniva_parcel_terminal",
      method_title: "Omniva parcel terminal",
      available: true,
      amount: 1.95,
      comment: 'Delivery in 3 days to the nearest parcel terminal.',
      deliveryTermsComment: "The order can be picked up in 3-9 working days.",
      active: true,
      content: {
        logo: 'assets/icons/shipping/shipping-omniva-parcel-terminal.svg',
        class: '',
      },
    },
    {
      carrier_code: "parcel_terminal",
      carrier_title: "Parcel terminal delivery",
      method_code: "parcel_terminal",
      method_title: "Parcel terminal delivery",
      available: true,
      comment: "Delivery in 3 days to the nearest parcel terminal",
      deliveryTermsComment: "",
      content: {
        logo: 'assets/icons/shipping/shipping-omniva-parcel-terminal.svg',
        class: '',
      },
      active: false,
      parcelTerminalOptions: [
        {
          carrier_code: "omniva_parcel_terminal",
          carrier_title: "Omniva parcel terminal",
          method_code: "omniva_parcel_terminal",
          method_title: "Omniva parcel terminal",
          available: true,
          amount: 1.95,
          comment: 'Delivery in 3 days to the nearest parcel terminal',
          active: true,
          content: {
            logo: 'assets/icons/shipping/shipping-omniva-parcel-terminal.svg',
            class: '',
          }
        }
      ]
    },
    {
      carrier_code: "store_pickup",
      carrier_title: "Free pickup from the store",
      method_code: "store_pickup",
      method_title: "Free pickup from the store",
      available: true,
      comment: 'Possibility to pickup order from the store in less than 2 days',
      deliveryTermsComment: "You will be able to receive the product in the information center of our store within 2-8 working days.",
      active: true,
      content: {
        logo: 'assets/icons/shipping/shipping-in-store.svg',
        class: ''
      }
    },
    {
      carrier_code: "courier_shipping",
      carrier_title: "Courier delivery",
      method_code: "courier_shipping",
      method_title: "Courier delivery",
      available: true,
      amount: 5.95,
      comment: "Delivery in 3 working days right to the doors.",
      deliveryTermsComment: "Pasūtījums tiks piegādāts 3–9 darba dienu laikā.",
      active: true,
      content: {
        logo: 'assets/icons/shipping/shipping-courier.svg',
        class: 'courier_icon'
      }
    }
  ];


  constructor(private localStorage: LocalStorageServiceService) {

  }

  getAvalableShippingMethods(): ShippingOptions[] {
    return this.availableShippingMethods.filter(method => method.active);
  }

  setShippingLocation(location: DeliveryCountryInterface) {
    this.localStorage.set('shippingLocation', JSON.stringify(location));
  }

  getShippingLocation() {
    const currentShippingLocation: DeliveryCountryInterface = JSON.parse(this.localStorage.get('shippingLocation') || '{}');

    if (!!Object.entries(currentShippingLocation).length) {
      return this.selectedShippingLocation = currentShippingLocation;
    }

    this.setShippingLocation(this.selectedShippingLocation);

    return this.selectedShippingLocation;
  }

  getDynamicShippingComponents() {

  }
}
