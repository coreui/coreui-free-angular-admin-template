import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {

  const guestURLs = [
    '/login'
  ];

  let publicUrlMatched = false;

  guestURLs.forEach(url => {
    publicUrlMatched = publicUrlMatched || `${environment.api.path}${url}` === req.url;
    console.log(`${environment.api.path}${url}`, req.url)
  });

  if (publicUrlMatched === false) {
    const authToken = JSON.parse(localStorage.getItem('auth') ?? '{}')?.content?.token;

    if (authToken) {
      req = req.clone({
          setHeaders: {
              Authorization: "Bearer " + authToken
          }
      });
    }
  }

  return next(req);
};
