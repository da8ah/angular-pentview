import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export function authGuard(): CanActivateFn {
  return () => {
    const auth$ = inject(AuthService).isAuth$()
    const router = inject(Router);

    if (auth$.pipe(tap(auth => auth))) {
      return true;
    }

    // Redirect to the login page
    return router.navigateByUrl('/login');
  }
};
