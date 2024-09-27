import { Type } from "@angular/core";
import { ShippingOptions } from "./shipping";
import { EventEmitter } from "stream";

export class DynamicShippingItem {
    deliveryOptionData: any;
    constructor(public component: Type<any>, public data: ShippingOptions) { }
}