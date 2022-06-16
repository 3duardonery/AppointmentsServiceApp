import { Action, createAction, props } from '@ngrx/store';

export const loginRequest = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{
    email: string;
    token: string;
    isAuthenticated: boolean;
  }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ errorMessage: string }>()
);

export const logout = createAction('[Auth] Logout');

// export const setAuthData = createAction(
//   '[Login Page] Save auth state',
//   props<{ email: string; token: string; isAuthenticated: boolean }>()
// );

// export const setTokenLocalStorage = createAction(
//   '[Login Page] Save token on local storage',
//   props<{ email: string; token: string }>()
// );

// export const deleteTokenLocalStorage = createAction(
//   '[Login Page] Delete token from local storage',
//   props<{ tokenName: string }>()
// );
