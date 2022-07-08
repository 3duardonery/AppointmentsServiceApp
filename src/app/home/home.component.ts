import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Modal } from 'bootstrap';
import { AuthState } from '../login/store/reducers/auth.reducer';
import { AppointmentResponse } from '../shared/models/appointments-response';
import { AppointmentsService } from '../shared/services/appointments.service';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  showModal: boolean = false;
  modal: Modal | null = null;
  loading: boolean = false;

  appointmentsScheduled: AppointmentResponse[] = [];

  constructor(
    private appointmentService: AppointmentsService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.setAppointmentsSheduled();
  }

  private setAppointmentsSheduled(): void {
    this.appointmentService
      .getAppointmentsByUserEmail('edu.nery.cordeiro@gmail.com')
      .subscribe({
        next: (response) => {
          this.appointmentsScheduled = response;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {},
      });
  }

  goToCreatePage(): void {
    this._router.navigate(['appointments/create']);
  }

  goToFilterPage(): void {
    this._router.navigate(['appointments/filter']);
  }

  goToCreateBookPage(): void {
    this._router.navigate(['book/create']);
  }
}
