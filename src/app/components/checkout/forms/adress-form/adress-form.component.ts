import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-adress-form',
  standalone: true,
  imports: [
  ],
  templateUrl: './adress-form.component.html',
  styleUrl: './adress-form.component.css'
})
export class AdressFormComponent {

  addressForm = new FormGroup({
    firstName: new FormControl<string>(''),
    lastName: new FormControl<string>(''),
    address: new FormGroup({
      address1: new FormControl<string>(''),
      address2: new FormControl<string>('')
    }),
    zipCode: new FormControl<string>(''),
    city: new FormControl<string>(''),
    state: new FormControl<string>('')
  });

  onSubmit() {
    console.log('>> submitForm', this.addressForm);
  }
}
