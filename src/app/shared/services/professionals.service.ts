import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Professional } from '../models/professional';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalsService {
  _url: string = environment.api;

  constructor(private _http: HttpClient) {}

  getAvailableProfessionalByEmail(email: string): Observable<Professional> {
    const params = new HttpParams().set('email', email);
    return this._http.get<Professional>(`${this._url}/professional/email`, {
      params,
    });
  }
}
