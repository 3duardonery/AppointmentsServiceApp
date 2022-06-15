import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { PagesGuard } from '../shared/providers/pages-guard';
import { CreateAppointmentComponent } from './components/create-appointment/create-appointment.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [PagesGuard],
  },
];

@NgModule({
  declarations: [HomeComponent, HeaderComponent, CreateAppointmentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [],
  providers: [PagesGuard],
})
export class HomeModule {}
