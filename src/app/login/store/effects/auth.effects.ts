import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { User } from 'src/app/shared/models/user-model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

import {
  login,
  loginFailure,
  loginSuccess,
  logout,
} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      exhaustMap((action) =>
        this.authService.login(action).pipe(
          map((res: any) => {
            if (res && res.user) {
              return loginSuccess(res);
            }
            return loginFailure(res);
          })
        )
      )
    )
  );

  $loginSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(({ token, email }) => {
          let data = {
            email: email,
            token: token,
          };
          localStorage.setItem('authentication_data', JSON.stringify(data));
          this.router.navigateByUrl('/home');
        })
      ),
    { dispatch: false }
  );

  $logout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          localStorage.clear();
          this.router.navigateByUrl('/login');
        })
      ),
    { dispatch: false }
  );
}
