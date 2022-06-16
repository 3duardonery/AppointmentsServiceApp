import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  AuthState,
  seletcToken,
} from 'src/app/login/store/reducers/auth.reducer';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token$ = this.store.select(seletcToken);

  constructor(private store: Store<AuthState>) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(request.url);

    if (request.url.indexOf('authentication') < 0) {
      let token = '';

      this.token$.pipe(take(1)).subscribe((value) => (token = value));

      console.log(token);

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request);
  }
}
