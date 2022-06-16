import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AuthState,
  selectAuthState,
} from 'src/app/login/store/reducers/auth.reducer';

@Injectable()
export class PagesGuard implements CanActivate {
  isAuthenticated$ = this.store.select(selectAuthState);
  userAuthenticated: boolean = false;

  constructor(private store: Store<AuthState>) {}

  async canActivate() {
    await this.isAuthenticated$.subscribe({
      next: (state) => {
        this.userAuthenticated = state.isAuthenticated;
      },
      error: (error) => {
        this.userAuthenticated = false;
      },
    });

    return this.userAuthenticated;
  }
}
