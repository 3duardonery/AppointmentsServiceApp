import { Action, createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/user-model';

export const login = createAction('[Auth] Login', props<User>());

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{
    email: string;
    token: string;
    isAuthenticated: boolean;
    errorMessage: string;
  }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ errorMessage: string }>()
);

export const logout = createAction('[Auth] Logout');

export const setAuthData = createAction(
  '[Login Page] Save auth state',
  props<{ email: string; token: string; isAuthenticated: boolean }>()
);

export const setTokenLocalStorage = createAction(
  '[Login Page] Save token on local storage',
  props<{ email: string; token: string }>()
);

export const deleteTokenLocalStorage = createAction(
  '[Login Page] Delete token from local storage',
  props<{ tokenName: string }>()
);
