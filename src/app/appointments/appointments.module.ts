import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesGuard } from '../shared/providers/pages-guard';
import { CreateAppointmentComponent } from './pages/create-appointment/create-appointment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterAppointmentsComponent } from './pages/filter-appointments/filter-appointments.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [PagesGuard],
    children: [
      {
        path: 'create',
        component: CreateAppointmentComponent,
      },
      {
        path: 'filter',
        component: FilterAppointmentsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [CreateAppointmentComponent, FilterAppointmentsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
})
export class AppointmentsModule {}
