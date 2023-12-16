import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const user = false;

  const router = inject(Router);
  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
