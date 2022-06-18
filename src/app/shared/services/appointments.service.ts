import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppointmentCreateResponse } from '../models/appointment-create-response';
import { AppointmentResponse } from '../models/appointments-response';
import { Book } from '../models/books';
import { CreateAppointment } from '../models/create-appointment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  _url: string = environment.api;

  constructor(private _http: HttpClient) {}

  saveAnAppointment(
    appointment: CreateAppointment
  ): Observable<AppointmentCreateResponse> {
    return this._http.post<AppointmentCreateResponse>(
      `${this._url}/appointments`,
      appointment
    );
  }

  getAppointmentsByUserEmail(email: string): Observable<AppointmentResponse[]> {
    const params = new HttpParams().set('email', email);
    return this._http.get<AppointmentResponse[]>(
      `${this._url}/appointments/professional`,
      {
        params,
      }
    );
  }
}
