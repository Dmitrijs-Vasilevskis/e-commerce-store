import { CanActivateFn, Router } from '@angular/router';
import { Inject, inject } from '@angular/core';
import { AccountService } from '../service/account/account.service';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  if (accountService.isAuthenticated()) {
    return true;
  }
  router.navigate(['/login']);

  return false;
};
