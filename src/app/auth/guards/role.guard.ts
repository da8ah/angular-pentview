import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ProfileService } from '../../core/profile/services/profile.service';

export const roleGuard: CanActivateFn = () => {
  const service = inject(ProfileService)
  const router = inject(Router)

  if (service.role === 'admin') return true

  router.navigateByUrl('/login')
  return false
};
