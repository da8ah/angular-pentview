import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('PVAT')
  return next(req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  }));
}
