import { NgClass, NgIf } from '@angular/common';
import { AfterViewInit, Component, OnInit, Signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { confirmPasswordValidator, regExpPatterns } from '../../../../types/validators/formValidators';
import { AccountService } from '../../../../service/account/account.service';
import { CustomerInterface } from '../../../../types/user/user.types';
import { RouterLink } from '@angular/router';
import { AuthServiceService } from '../../../../service/auth/auth-service.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {

  isRegistrationVisible: boolean = false;
  isLoggedIn: boolean = false;
  customerData: any = [];

  authForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern(regExpPatterns.email)]],
    password: ['', [Validators.required]],
  });

  registrationForm = this.formBuilder.nonNullable.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email, Validators.pattern(regExpPatterns.email)]],
    password: ['', [Validators.required]],
    passwordConfirm: ['', [Validators.required]],
  }, { validators: confirmPasswordValidator('password', 'passwordConfirm') });

  constructor(private formBuilder: FormBuilder,
    private accountService: AccountService,
    private authService: AuthServiceService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.accountService.isAuthenticated();

    if (this.isLoggedIn) {
      const customerId = this.accountService.getCustomerIdFromToken();
      if (customerId) {
        this.accountService.getUserData(parseInt(customerId)).subscribe((response) => {
          this.customerData = response.source.value;
        });
      }
    }
  }

  onAuthSubmit() {
    if (this.authForm.valid) {
      const { email = '', password = '' } = this.authForm.value;

      this.accountService.authentification(email, password).subscribe(
        (token) => {
          console.log('>> token', token);
        }
      );
    }
  }

  onRegistrationSubmit() {
    console.log('>> onRegistrationSubmit', this.registrationForm);
    if (this.registrationForm.valid) {
      console.log('>> registration form is valid');
      const {
        firstName = '',
        lastName = '',
        email = '',
        password = ''
      } = this.registrationForm.value;

      return this.accountService.registration(firstName, lastName, email, password).subscribe(
        (response: any) => {
          console.log(response);
        }
      );
    }

    return null;
  }

  onSignUp() {
    this.isRegistrationVisible = !this.isRegistrationVisible;
  }

  onLogOut() {
    this.accountService.logOut();
  }

  asd() {
    console.log(this.accountService.isAuthenticated());
  }
}