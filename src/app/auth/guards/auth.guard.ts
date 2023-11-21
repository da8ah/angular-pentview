import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService)
  const router = inject(Router);

  if (authService.isAuth$().pipe(tap(auth => auth))) {
    return true;
  }

  // Redirect to the login page
  return router.navigateByUrl('/login');
};
