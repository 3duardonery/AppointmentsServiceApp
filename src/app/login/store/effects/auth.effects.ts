import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

import * as AuthActions from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      exhaustMap((action) =>
        this.authService
          .login({
            email: action.email,
            password: action.password,
          })
          .pipe(
            map((loginSuccessResponse) =>
              AuthActions.loginSuccess({
                email: loginSuccessResponse.email,
                isAuthenticated: true,
                token: loginSuccessResponse.idToken,
              })
            ),
            catchError((errorMessage) =>
              of(AuthActions.loginFailure({ errorMessage }))
            )
          )
      )
    )
  );

  $loginSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ token, email }) => {
          this.router.navigateByUrl('/home');
        })
      ),
    { dispatch: false }
  );

  $logout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.clear();
          this.router.navigateByUrl('/login');
        })
      ),
    { dispatch: false }
  );
}
