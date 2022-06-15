import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PrimaryButtonComponent } from './components/primary-button/primary-button.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { AuthenticationService } from './services/authentication.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ServicesJobService } from './services/services-job.service';
import { TokenInterceptor } from './interceptor/token-interceptor';

@NgModule({
  declarations: [PrimaryButtonComponent, FooterComponent, NavbarComponent],
  imports: [CommonModule, FormsModule, HttpClientModule],
  exports: [PrimaryButtonComponent, FooterComponent, NavbarComponent],
  providers: [
    AuthenticationService,
    ServicesJobService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule {}
