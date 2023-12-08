import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ProfileService } from '../../core/profile/services/profile.service';

export const roleGuard: CanActivateFn = () => {
  const srvProfile = inject(ProfileService)
  const router = inject(Router)

  if (srvProfile.role === 'admin') return true

  router.navigateByUrl('/login')
  return false
};
