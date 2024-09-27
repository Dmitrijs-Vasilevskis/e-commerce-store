import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { ShippingOptions } from '../../../types/shipping/shipping';
import { CurrencyPipe, NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-courier',
  standalone: true,
  imports: [
    CurrencyPipe,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './courier.component.html',
  styleUrl: '../delivery.component.css'
})
export class CourierComponent implements AfterViewInit {
  @Input() data!: ShippingOptions;
  @Output() deliveryOptionData = new EventEmitter<any>();

  deliveryForm = this.formBuilder.group({
    deliveryMethod: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    telephone: ['', Validators.required],
    city: ['', Validators.required],
    address: ['', Validators.required],
    zipCode: ['', Validators.required],
    comment: ['']
  });
  isFormVisible: boolean = false;

  constructor(private formBuilder: FormBuilder) {

  }

  ngAfterViewInit(): void {
    this.deliveryForm.controls.deliveryMethod.setValue(this.data.method_code)
  }

  triggerForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  submitDeliveryMethodData() {
    this.deliveryOptionData.emit('CourierComponent');
  }
}
