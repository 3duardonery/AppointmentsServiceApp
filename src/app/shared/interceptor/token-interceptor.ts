import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(request.url);

    if (request.url.indexOf('authentication') < 0) {
      let token =
        JSON.parse(localStorage.getItem('authentication_data') ?? '')[
          'token'
        ] ?? '';

      console.log(token);

      console.log(localStorage.getItem('authentication_data'));

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request);
  }
}
