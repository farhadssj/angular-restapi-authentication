import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { AppRoute } from '../constants/app-route';

export const authGuard: CanActivateFn = (route, state) => {
  console.log('authGuard#canActivate called');
  const authService = inject(AuthService);
  const router = inject(Router);

  // first Check that user is currently loged in
  if (authService.isUserLogin()) {
    return true;
  }
  // not logged in so redirect to login page with the return url
  router.navigate([AppRoute.LOGIN_ROUTE], { queryParams: { returnUrl : state.url }});
  return false;
};