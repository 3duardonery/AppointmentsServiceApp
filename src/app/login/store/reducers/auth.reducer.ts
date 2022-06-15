import { Action, createReducer, on } from '@ngrx/store';
import {
  setAuthData,
  setTokenLocalStorage,
  deleteTokenLocalStorage,
  loginSuccess,
  logout,
  loginFailure,
} from '../actions/auth.actions';
type Nullable<T> = T | null;

export interface AuthState {
  isAuthenticated: boolean;
  email: string;
  token: string;
  errorMessage: Nullable<string>;
}

export const authInitState: AuthState = {
  email: '',
  token: '',
  isAuthenticated: false,
  errorMessage: '',
};

export const authReducer = createReducer(
  authInitState,
  on(
    loginSuccess,
    (state, { email, token, isAuthenticated, errorMessage }) => ({
      email,
      isAuthenticated,
      token,
      errorMessage,
    })
  ),
  on(logout, () => authInitState),
  on(loginFailure, (state, { errorMessage }) => ({
    ...authInitState,
    errorMessage,
  }))
);
