import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './reducers/auth.reducer';

export const getAuthState = createFeatureSelector<AuthState>('auth');

export const isAuthenticated = createSelector(
  getAuthState,
  (state) => state.isAuthenticated
);

export const getAccessToken = createSelector(
  getAuthState,
  (state) => state.token
);

export const getErrorMessage = createSelector(
  getAuthState,
  (state) => state.errorMessage
);

export const getUserInStore = createSelector(
  getAuthState,
  (state) => state.email
);
