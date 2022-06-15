import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppointmentsModule } from './appointments/appointments.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { AuthEffects } from './login/store/effects/auth.effects';
import { authReducer } from './login/store/reducers/auth.reducer';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    HomeModule,
    AppointmentsModule,
    SharedModule,
    StoreModule.forRoot(authReducer, {}),
    EffectsModule.forRoot([AuthEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
