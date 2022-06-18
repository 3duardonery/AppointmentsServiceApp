import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesGuard } from '../shared/providers/pages-guard';
import { CreateAppointmentComponent } from './pages/create-appointment/create-appointment.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    canActivate: [PagesGuard],
    children: [
      {
        path: 'create',
        component: CreateAppointmentComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [CreateAppointmentComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
})
export class AppointmentsModule {}
