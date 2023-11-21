import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const authGuard: CanActivateFn = () => {
  const service = inject(AuthService)
  const router = inject(Router)

  if (service.isTokenSaved) return true;

  router.navigateByUrl('/login')
  return false
}