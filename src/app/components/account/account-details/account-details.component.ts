import { AfterViewInit, Component, OnInit, WritableSignal, effect } from '@angular/core';
import { AccountService } from '../../../service/account/account.service';
import { UserInterface } from '../../../types/user/user.types';
import { NgIf } from '@angular/common';
import { AuthServiceService } from '../../../service/auth/auth-service.service';

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [NgIf],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.css'
})
export class AccountDetailsComponent implements OnInit, AfterViewInit {

  userData: WritableSignal<UserInterface | undefined | null> = this.authService.currentUserSignIn;

  constructor(
    private accountService: AccountService,
    private authService: AuthServiceService) {
    
  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {

  }

  showPassword() {
    
  }
}
