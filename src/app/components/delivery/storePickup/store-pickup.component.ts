import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { ShippingOptions } from '../../../types/shipping/shipping';
import { CurrencyPipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-store-pickup',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './store-pickup.component.html',
  styleUrl: '../delivery.component.css'
})
export class StorePickupComponent implements AfterViewInit {
  @Input() data!: ShippingOptions;
  @Output() deliveryOptionData = new EventEmitter<any>();

  isFormVisible: boolean = false;

  deliveryForm = this.formBuilder.group({
    deliveryMethod: [''],
  })

  constructor(private formBuilder: FormBuilder) {

  }

  ngAfterViewInit(): void {
    this.deliveryForm.controls.deliveryMethod.setValue(this.data.method_code);
  }

  triggerForm() {
    this.isFormVisible = !this.isFormVisible;

    console.log(!this.isFormVisible);
  }

  submitDeliveryMethodData() {
    this.deliveryOptionData.emit('StorePickupComponent');
  }
}
