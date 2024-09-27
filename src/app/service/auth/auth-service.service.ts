import { Injectable, effect, signal } from '@angular/core';
import { UserInterface } from '../../types/user/user.types';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  currentUserSignIn = signal<UserInterface | undefined | null>(undefined);
  isLoggedIn: boolean = false;
  
  constructor() {
    effect(() => {
      this.currentUserSignIn() ? this.isLoggedIn = true : this.isLoggedIn = false;
    })
  }
}
