import { Component, Type } from "@angular/core";
import { OmnivaComponent } from "../../components/delivery/omniva/omniva.component";
import { StorePickupComponent } from "../../components/delivery/storePickup/store-pickup.component";
import { CourierComponent } from "../../components/delivery/courier/courier.component";

export interface ShippingOptions {
    carrier_code: string;
    carrier_title: string;
    method_code: string;
    method_title: string;
    available: boolean;
    amount?: number;
    comment: string;
    deliveryTermsComment: string;
    active: boolean;
    content: {
        logo: string;
        class: string;
    },
    parcelTerminalOptions?: [
        {
            carrier_code: string;
            carrier_title: string;
            method_code: string;
            method_title: string;
            available: boolean;
            amount?: number;
            comment: string;
            active: boolean;
            content?: {
                logo: string;
                class: string;
            },
        }
    ]
}

export type DeliveryTypeKeys = 'omniva_parcel_terminal' | 'store_pickup' | 'courier_shipping';

export const TypeMappedDeliveryMethods: Record<DeliveryTypeKeys, Type<any>> = {
    'omniva_parcel_terminal': OmnivaComponent,
    'store_pickup': StorePickupComponent,
    'courier_shipping': CourierComponent
}

