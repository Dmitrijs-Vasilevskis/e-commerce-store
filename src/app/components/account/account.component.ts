import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../service/account/account.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {

  customerData: any = [];

  constructor(private accountService: AccountService) {

  }

  ngOnInit(): void {
    this.accountService.getCurrentUser().subscribe((response) => {
      this.customerData = response;
    });
  }


  onLogOut() {
    this.accountService.logOut();
  }

}
