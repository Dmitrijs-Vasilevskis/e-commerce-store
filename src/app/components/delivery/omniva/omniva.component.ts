import { AfterViewInit, Component, Input, OnInit, Output } from '@angular/core';
import { OmnivaLatviaService } from '../../../service/shipping/omniva/omniva-latvia.service';
import { OmnivaInterface, DeliveryCountryInterface } from '../../../types/shipping/methods/omniva/omniva';
import { DropdownModule } from 'primeng/dropdown';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShippingOptionsService } from '../../../service/shipping/shipping-options/shipping-options.service';
import { ShippingOptions } from '../../../types/shipping/shipping';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-omniva',
  standalone: true,
  imports: [
    DropdownModule,
    ReactiveFormsModule,
    NgFor,
    NgIf,
    FormsModule,
    CurrencyPipe
  ],
  templateUrl: './omniva.component.html',
  styleUrl: '../delivery.component.css'
})
export class OmnivaComponent implements AfterViewInit {
  @Input() data!: ShippingOptions;
  @Output() deliveryOptionData = new EventEmitter<any>();

  deliveryForm = this.formBuilder.group({
    deliveryMethod: ['', Validators.required],
    parcelTerminal: [],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    telephone: ['', Validators.required]
  });

  omnivaDeliveryOptions: OmnivaInterface[] = [];
  omnivaDeliveryOptionsByCountry: OmnivaInterface[] = [];
  deliveryCountry: DeliveryCountryInterface = {
    country_code: '',
    country_name: ''
  }

  selectedCountry: any = '';
  isFormVisible: boolean = false;

  constructor(
    private omnivaService: OmnivaLatviaService,
    private shippingOptionsService: ShippingOptionsService,
    private formBuilder: FormBuilder) {

  }

  ngAfterViewInit(): void {
    this.deliveryForm.controls.deliveryMethod.setValue(this.data.method_code);
    this.deliveryCountry = this.shippingOptionsService.getShippingLocation();

    this.omnivaService.loadCsv().then((data) => {
      this.omnivaDeliveryOptions = data;
      this.getDeliveryOptionsByCountry(this.omnivaDeliveryOptions);
    });
  }

  submitDeliveryMethodData() {
    this.deliveryOptionData.emit(this.deliveryForm);
  }


  getDeliveryOptionsByCountry(omnivaDeliveryOptions: OmnivaInterface[]) {
    const destinationCountryCode = this.deliveryCountry.country_code;

    return this.omnivaDeliveryOptionsByCountry = omnivaDeliveryOptions.filter((item) => item.a0_name === destinationCountryCode);
  }

  triggerForm() {
    this.isFormVisible = !this.isFormVisible;
  }
}
