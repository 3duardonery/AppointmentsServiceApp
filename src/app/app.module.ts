import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppointmentsModule } from './appointments/appointments.module';
import { BookModule } from './book/book.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { AuthEffects } from './login/store/effects/auth.effects';
import { authReducer } from './login/store/reducers/auth.reducer';
import { SharedModule } from './shared/shared.module';

export function localStorageSyncReducer(rootReducer: any) {
  return localStorageSync({
    keys: ['auth'],
    rehydrate: true,
  })(rootReducer);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    HomeModule,
    AppointmentsModule,
    BookModule,
    SharedModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreModule.forRoot(
      { auth: authReducer },
      { metaReducers: [localStorageSyncReducer] }
    ),
    EffectsModule.forRoot([AuthEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
