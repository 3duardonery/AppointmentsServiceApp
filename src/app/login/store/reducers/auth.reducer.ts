import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { loginSuccess, logout, loginFailure } from '../actions/auth.actions';
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

const _authReducer = createReducer(
  authInitState,
  on(loginSuccess, (state, { email, token, isAuthenticated }) => ({
    ...state,
    email,
    isAuthenticated,
    token,
  })),
  on(logout, () => authInitState),
  on(loginFailure, (state, { errorMessage }) => ({
    ...authInitState,
    errorMessage,
  }))
);

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}

export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const seletcToken = createSelector(
  selectAuthState,
  (state) => state.token
);

export const isAuthenticated = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated
);
